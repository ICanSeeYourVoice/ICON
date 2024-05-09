import { PulseLoader } from "react-spinners";
import ReactButton from "../../components/main/detection/ReactButton";
import {
  DETECTION,
  DETECTION_INFO,
  FAILED_INFO,
  LOADING_INFO,
} from "../../constants/detection";
import { useEffect, useRef } from "react";
import { useDetectionStore } from "../../stores/detection";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { analyzeAlarm, cryAlarm } from "../../apis/Notification";
import toast from "react-hot-toast";
import * as tf from "@tensorflow/tfjs";
import { loadYamnetModel } from "../../utils/cryingClassification";
import useBleStore from "../../stores/bluetooth";

const DetectionPage = () => {
  const worker = new Worker("recordingWorker.js");

  const navigate = useNavigate();
  const isBabyCry = useDetectionStore((state: any) => state.isBabyCry);
  const cryingType = useDetectionStore((state: any) => state.cryingType);
  const modelRef = useRef<tf.GraphModel | null>(null);
  const setIsBabyCry = useDetectionStore((state: any) => state.setIsBabyCry);
  const setCryingType = useDetectionStore((state: any) => state.setCryingType);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { writeCharacteristic } = useBleStore();

  const { mutate } = useMutation({
    mutationFn: cryAlarm,
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: analyzeMutate } = useMutation({
    mutationFn: analyzeAlarm,
    onSuccess: (res: any) => {
      console.log(res);
      setCryingType(res.cryReason);
    },
    onError: (error: any) => {
      toast.error(error.message);

      if (error.response.status === 500) {
        setIsBabyCry(false);
        setCryingType(0);
        writeCharacteristic("normal");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
  });

  let toastId: any;
  let audioCtx: AudioContext | null = null;
  let scriptNode: ScriptProcessorNode | null = null;
  let source: any = null;

  const fetchDataAndProcess = async () => {
    toastId = toast.loading("아기울음감지를 준비 중입니다.");

    try {
      const yamnet = await loadYamnetModel();
      modelRef.current = yamnet;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      audioCtx = new AudioContext({ sampleRate: 16000 });
      source = audioCtx.createMediaStreamSource(stream);
      scriptNode = audioCtx.createScriptProcessor(8192, 1, 1);

      source.connect(scriptNode);
      scriptNode.connect(audioCtx.destination);

      let audioBuffer: number[] = [];

      intervalRef.current = setInterval(() => {
        console.log("녹음 초기화 " + intervalRef.current);
        audioBuffer = [];
      }, 4000);

      let isCry = false;
      let cnt = 0;

      scriptNode.onaudioprocess = function (e) {
        console.log(cnt);
        if (isCry) cnt++;

        const inputBuffer = e.inputBuffer;
        let inputData = inputBuffer.getChannelData(0);

        audioBuffer.push(...inputData);

        const [scores] = yamnet.predict(tf.tensor(inputData)) as [any];
        const top5 = tf.topk(scores, 3, true);
        const classes = top5.indices.dataSync();
        const probabilities = top5.values.dataSync();

        if (cnt == 0) {
          for (let i = 0; i < 3; i++) {
            if (classes[i] === 20 && probabilities[i] >= 0.5) {
              isCry = true;
              setIsBabyCry(true);
              setCryingType("LOADING");
              mutate();
              clearInterval(intervalRef.current!);

              return;
            }
          }
        } else {
          if (cnt >= 4) {
            streamRef.current!.getTracks().forEach((track) => track.stop());
            source?.disconnect();
            scriptNode?.disconnect();
            clearInterval(intervalRef.current!);
            console.log(intervalRef.current! + " 해제(cnt)");

            modelRef.current = null;
            streamRef.current = null;

            worker.postMessage(audioBuffer);
            worker.onmessage = function (e) {
              const sound = e.data;
              analyzeMutate({ data: sound });
            };

            return;
          }
        }
      };
    } catch (error) {
      toast.error(
        "울음감지 준비 중 오류가 발생했습니다.\n 마이크를 허용하고 다시 시작해주세요."
      );
      setCryingType("FAILED");
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (!isBabyCry) {
      fetchDataAndProcess();
    }

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      clearInterval(intervalRef.current!);
      console.log(intervalRef.current! + " 해제");

      source?.disconnect();
      scriptNode?.disconnect();

      modelRef.current = null;
      streamRef.current = null;

      toast.dismiss(toastId);
      toastId = null;
    };
  }, []);

  useEffect(() => {
    if (
      cryingType !== "LOADING" &&
      cryingType !== "FAILED" &&
      cryingType !== 0
    ) {
      navigate("/detection/result");
    }
  }, [cryingType]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <p className="text-gray-1 text-sm ">
        {cryingType === "FAILED"
          ? FAILED_INFO
          : cryingType === "LOADING"
          ? LOADING_INFO
          : DETECTION_INFO}
      </p>
      <ReactButton
        icon={
          cryingType === "LOADING"
            ? DETECTION.LOADING.ICON
            : cryingType === "FAILED"
            ? DETECTION.FAILED.ICON
            : DETECTION.NORMAL.ICON
        }
        color={
          cryingType === "LOADING"
            ? DETECTION.LOADING.COLOR
            : cryingType === "FAILED"
            ? DETECTION.FAILED.COLOR
            : DETECTION.NORMAL.COLOR
        }
      />
      {cryingType ? (
        <PulseLoader color="#c8c8c8" />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-0 text-xl">
          <p>아기가</p>
          <p>
            <span className="text-white">{DETECTION.NORMAL.MESSAGE}</span>
            상태에요
          </p>
        </div>
      )}
      <div className="flex items-center justify-center w-[80%] h-[6rem]"></div>
    </div>
  );
};

export default DetectionPage;
