import { PulseLoader } from "react-spinners";
import ReactButton from "../../components/main/detection/ReactButton";
import {
  DETECTION,
  DETECTION_INFO,
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

const DetectionPage = () => {
  const worker = new Worker("recordingWorker.js");

  const navigate = useNavigate();
  const isBabyCry = useDetectionStore((state: any) => state.isBabyCry);
  const cryingType = useDetectionStore((state: any) => state.cryingType);
  const model = useRef<tf.GraphModel | null>(null);
  const setIsBabyCry = useDetectionStore((state: any) => state.setIsBabyCry);
  const setCryingType = useDetectionStore((state: any) => state.setCryingType);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      }
    },
  });

  useEffect(() => {
    if (isBabyCry) {
      mutate();
    }
  }, [isBabyCry]);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      let toastId;

      try {
        if (!streamRef.current) {
          toastId = toast.loading("아기울음감지를 준비 중입니다.");

          const yamnet = await loadYamnetModel();
          model.current = yamnet;
          const constraints = { audio: true };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);

          streamRef.current = stream;

          const audioCtx = new AudioContext({ sampleRate: 16000 });
          const source = audioCtx.createMediaStreamSource(stream);
          const scriptNode = audioCtx.createScriptProcessor(8192, 1, 1);

          let audioBuffer: number[] = [];

          intervalRef.current = setInterval(() => {
            audioBuffer = [];
          }, 4000);

          let isCry = false;
          let cnt = 0;

          scriptNode.onaudioprocess = function (e) {
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

                  clearInterval(intervalRef.current!);

                  return;
                }
              }
            } else {
              if (cnt >= 4) {
                streamRef.current!.getTracks().forEach((track) => track.stop());

                worker.postMessage(audioBuffer);
                worker.onmessage = function (e) {
                  const sound = e.data;
                  analyzeMutate({ data: sound });
                  source.disconnect();
                  scriptNode.disconnect();
                  audioCtx.close();
                };
              }
            }
          };

          source.connect(scriptNode);
          scriptNode.connect(audioCtx.destination);

          toast.success("울음감지 시작");
        } else {
          toast.error("마이크 연결에 실패하였습니다.");
        }
      } catch (error) {
        toast.error("아기울음감지를 준비 중 오류가 발생했습니다.");
      } finally {
        toast.dismiss(toastId);
      }
    };

    if (!isBabyCry) fetchDataAndProcess(); // 로그인 여부 확인 필요

    // return () => {
    //   if (streamRef.current) {
    //     streamRef.current.getTracks().forEach((track) => track.stop());
    //   }
    // };
  }, []);

  useEffect(() => {
    if (cryingType !== 0) {
      navigate("/detection/result");
    }
  }, [cryingType]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <p className="text-gray-1 text-sm ">
        {isBabyCry ? LOADING_INFO : DETECTION_INFO}
      </p>
      <ReactButton
        icon={isBabyCry ? DETECTION.LOADING.ICON : DETECTION.NORMAL.ICON}
        color={isBabyCry ? DETECTION.LOADING.COLOR : DETECTION.NORMAL.COLOR}
      />
      {isBabyCry ? (
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
