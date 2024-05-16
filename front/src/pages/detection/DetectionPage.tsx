import { PulseLoader } from "react-spinners";
import ReactButton from "../../components/main/detection/ReactButton";
import {
  DETECTION,
  DETECTION_INFO,
  FAILED_INFO,
  LOADING_INFO,
} from "../../constants/detection";
import { useEffect, useRef, useState } from "react";
import {
  useDetectionStore,
  useLoading,
  useToggle,
  useYamnetStore,
} from "../../stores/detection";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { analyzeAlarm, cryAlarm, poseAlarm } from "../../apis/Notification";
import toast from "react-hot-toast";
import * as tf from "@tensorflow/tfjs";
import { loadYamnetModel } from "../../utils/loadModel";
import useBleStore from "../../stores/bluetooth";
import classmap from "../../model/yamnet-class-map.json";
import * as faceapi from "@vladmandic/face-api";
import { useDetectionPoseStore } from "../../stores/detectionPose";
import UnresponsiveButton from "../../components/main/detection/UnresponsiveButton";

// test code
type Result = {
  label: any;
  probability: any;
};

const DetectionPage = () => {
  const { yamnetModel, setModel } = useYamnetStore.getState();
  const { isCryDetect, isFaceDetect, isCamera, setIsFaceDetect, setIsCamera } =
    useToggle();
  const navigate = useNavigate();
  const isBabyCry = useDetectionStore((state: any) => state.isBabyCry);
  const cryingType = useDetectionStore((state: any) => state.cryingType);
  const isBabyFace = useDetectionPoseStore((state: any) => state.isBabyFace);
  const setIsBabyCry = useDetectionStore((state: any) => state.setIsBabyCry);
  const setCryingType = useDetectionStore((state: any) => state.setCryingType);
  const setIsBabyFace = useDetectionPoseStore(
    (state: any) => state.setIsBabyFace
  );
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const camMediaStream = useRef<MediaStream | null>(null);
  const { writeCharacteristic } = useBleStore();
  const setLoading = useLoading((state) => state.setLoading);

  const [results, setResults] = useState<Result[]>([]); // test위한 코드

  const { mutate: poseMutate } = useMutation({
    mutationFn: poseAlarm,
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: cryMutate } = useMutation({
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

  const intervalRef = useRef<number | null>(null);
  let noFaceCnt = 0;

  const detectFaceFeatures = async () => {
    setLoading(true);
    try {
      const MODEL_URL = "/pose_model";

      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);

      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "user",
          },
        })
        .then((stream) => {
          camMediaStream.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        });

      // test로 인한 코드
      // navigator.mediaDevices
      //   .getUserMedia({
      //     video: true,
      //   })
      //   .then((stream) => {
      //     camMediaStream.current = stream;
      //     if (videoRef.current) {
      //       videoRef.current.srcObject = stream;
      //       videoRef.current.play();
      //     }
      //   });

      const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
        minConfidence: 0.2,
      });

      if (!videoRef.current) return;

      intervalRef.current = window.setInterval(async () => {
        // console.log("interval: " + intervalRef.current);

        if (videoRef.current) {
          const detections = await faceapi
            .detectSingleFace(videoRef.current, optionsSSDMobileNet)
            .withFaceLandmarks();

          noFaceCnt = detections ? 0 : noFaceCnt + 1;

          if (noFaceCnt > 1) {
            noFaceCnt = 0;
            setIsBabyFace(false);

            clearInterval(intervalRef.current!);

            poseMutate();
            writeCharacteristic("danger");
            navigate("/detection/result/pose");
          }
        }
      }, 1000);
    } catch (error) {
      toast.error(
        "행동감지 준비 중 오류가 발생했습니다.\n 비디오를 허용하고 다시 시작해주세요."
      );
      setCryingType("FAILED");
    } finally {
      setLoading(false);
    }
  };

  let audioCtx: AudioContext | null = null;
  let scriptNode: ScriptProcessorNode | null = null;
  let scriptNodeRef = useRef<ScriptProcessorNode | null>();
  let source: any = null;
  let gainNode: any = null;

  const TIMES = 4;
  const PERCENTAGE = 0.38;
  const RANK = 3;
  const CLASS = {
    BABY_CRY: 20,
    CAT: 76,
    MEOW: 78,
  };

  const detectCryState = async () => {
    setLoading(true);
    try {
      let yamnet: any;

      if (!yamnetModel) {
        yamnet = await loadYamnetModel();
        setModel(yamnet);
      } else {
        yamnet = yamnetModel;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      audioCtx = new AudioContext({ sampleRate: 16000 });
      source = audioCtx.createMediaStreamSource(stream);
      gainNode = audioCtx.createGain();
      scriptNode = audioCtx.createScriptProcessor(4096 * TIMES, 1, 1);
      // scriptNode = audioCtx.createScriptProcessor(16384, 1, 1);
      // scriptNode = audioCtx.createScriptProcessor(8192, 1, 1);

      scriptNodeRef.current = scriptNode;

      gainNode.gain.value = 4;
      source.connect(gainNode);
      gainNode.connect(scriptNode);
      scriptNode.connect(audioCtx.destination);

      let audioBuffer: number[] = [];
      let isCry = false;
      let cnt = 0;
      let initRecordCnt = 0;

      scriptNode.onaudioprocess = function (e) {
        // console.log(cnt);

        if (isCry) {
          cnt++;
        } else {
          initRecordCnt++;
          console.log("cry: cnt");
          if (initRecordCnt >= 16 / TIMES) {
            initRecordCnt = 0;
            audioBuffer = [];
          }
        }

        const inputBuffer = e.inputBuffer;
        let inputData = inputBuffer.getChannelData(0);

        audioBuffer.push(...inputData);

        const [scores] = yamnet.predict(tf.tensor(inputData)) as [any];
        const top5 = tf.topk(scores, 5, true);
        const classes = top5.indices.dataSync();
        const probabilities = top5.values.dataSync();

        const updatedResults: any[] = []; // test를 위한 코드
        if (cnt == 0) {
          for (let i = 0; i < 5; i++) {
            // test를 위한 코드
            updatedResults.push({
              label: (classmap as any)[classes[i]].display_name,
              probability: probabilities[i].toFixed(3),
            });

            // test 코드
            if (classes[i] === CLASS.BABY_CRY)
              console.log("cry: " + probabilities[i]);
            if (classes[i] === CLASS.CAT)
              console.log("cat: " + probabilities[i]);
            if (classes[i] === CLASS.MEOW)
              console.log("meow: " + probabilities[i]);
            if (classes[i] === CLASS.CAT && probabilities[i] >= 0.7 && i < 3) {
              console.log("고양이");
              return;
            }

            if (
              classes[i] === CLASS.BABY_CRY &&
              probabilities[i] >= PERCENTAGE &&
              i < RANK
            ) {
              // if (classes[i] === 20) {
              isCry = true;
              setIsBabyCry(true);
              setCryingType("LOADING");
              cryMutate();
              return;
            }
          }

          setResults(updatedResults); // test를 위한 코드
        } else {
          if (cnt >= 8 / TIMES) {
            const worker = new Worker("recordingWorker.js");

            streamRef.current!.getTracks().forEach((track) => track.stop());
            source?.disconnect();
            scriptNode?.disconnect();

            streamRef.current = null;

            worker.postMessage(audioBuffer);
            worker.onmessage = function (e) {
              const sound = e.data;
              console.log(URL.createObjectURL(sound));
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isCryDetect) {
      if (!isBabyCry && isBabyFace) {
        detectCryState();
      }
    } else {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      source?.disconnect();
      scriptNodeRef.current?.disconnect();
      streamRef.current = null;
    }
  }, [isCryDetect]);

  useEffect(() => {
    if (isFaceDetect) {
      if (!isBabyCry && isBabyFace) {
        detectFaceFeatures();
      }
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      camMediaStream.current?.getTracks().forEach((track) => track.stop());
    }
  }, [isFaceDetect]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      camMediaStream.current?.getTracks().forEach((track) => track.stop());

      streamRef.current?.getTracks().forEach((track) => track.stop());
      source?.disconnect();
      scriptNodeRef.current?.disconnect();
      streamRef.current = null;

      setIsFaceDetect(false);
      setIsCamera(false);
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
      <>
        <div
          className={`fixed w-[40%] aspect-video bottom-0 right-0 mb-[4.3125rem] mr-[1rem] ${
            !isCamera && "hidden w-[2px] h-[5px]"
          }`}
        >
          <video
            className="rounded-[1.2rem]"
            style={{ transform: "scaleX(-1)" }}
            ref={videoRef}
          />
        </div>

        {!isFaceDetect && !isCryDetect ? (
          <>
            <p className="text-gray-1 text-sm animate-pulse">
              설정 버튼을 눌러 감지를 켜주세요
            </p>
            <UnresponsiveButton />
            <div className="h-[4rem]"></div>
          </>
        ) : (
          <>
            <p className="text-gray-1 text-sm">
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
            {/* {cryingType ? (
              <div className="h-[4rem]">
                <PulseLoader
                  color="#c8c8c8"
                  cssOverride={{
                    height: "4rem",
                  }}
                />
              </div>
            ) : (
              <div className="h-[4rem] flex flex-col items-center justify-center text-gray-0 text-xl">
                <p>아기가</p>
                <p>
                  <span className="text-white">{DETECTION.NORMAL.MESSAGE}</span>
                  상태에요
                </p>
              </div>
            )} */}
            {cryingType ? (
              <div className="h-[4rem]">
                <PulseLoader color="#c8c8c8" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-white text-xs">
                {results.map((result, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      width: "18.8rem",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p>{result.label} </p>
                    <p> : ({result.probability}) </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <div className="flex items-center justify-center w-[80%] h-[6rem] invisible"></div>
      </>
    </div>
  );
};

export default DetectionPage;
