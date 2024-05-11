import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import * as faceapi from "@vladmandic/face-api";
import { DETECTION_POSE_INFO } from "../../constants/detectionPose";
import { useDetectionPoseStore } from "../../stores/detectionPose";
import { poseAlarm } from "../../apis/Notification";
import { useMutation } from "@tanstack/react-query";
import useBleStore from "../../stores/bluetooth";

const PosePage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const camMediaStream = useRef<MediaStream | null>(null);
  const intervalDetection = useRef<number | null>(null); // 타입을 number로 선언
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const { writeCharacteristic } = useBleStore();
  const navigate = useNavigate();
  const setIsBabyFace = useDetectionPoseStore(
    (state: any) => state.setIsBabyFace
  );

  const { mutate } = useMutation({
    mutationFn: poseAlarm,
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/pose_model";
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error("Model loading failed", error);
        toast.error("Failed to load face detection models.");
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
  }, [modelsLoaded]);

  // cleanup function for webcam usage
  useEffect(() => {
    return () => {
      camMediaStream.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      })
      .then((stream) => {
        camMediaStream.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Problem accessing the webcam. Ensure permission has been granted."
        );
      });
  };

  useEffect(() => {
    let noFaceCnt = 0;

    const detectFaceFeatures = async () => {
      const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
        minConfidence: 0.2,
      });

      if (!videoRef.current) return;

      intervalDetection.current = window.setInterval(async () => {
        if (videoRef.current) {
          const detections = await faceapi
            .detectSingleFace(videoRef.current, optionsSSDMobileNet)
            .withFaceLandmarks();

          noFaceCnt = detections ? 0 : noFaceCnt + 1;

          if (noFaceCnt > 1) {
            noFaceCnt = 0;
            setIsBabyFace(false);
            if (intervalDetection.current !== null) {
              clearInterval(intervalDetection.current);
            }
            mutate();
            writeCharacteristic("danger");
            navigate("/pose/result");
          }
        }
      }, 1000);
    };

    detectFaceFeatures();

    return () => {
      if (intervalDetection.current !== null) {
        clearInterval(intervalDetection.current);
      }
    };
  }, [videoRef.current]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <p className="text-gray-1 text-sm ">{DETECTION_POSE_INFO}</p>
      <video ref={videoRef} style={{ transform: "scaleX(-1)" }} />

      <div className="flex flex-col items-center justify-center text-white text-xl">
        <p>아기가 위험하다면</p>
        <p>알림을 보내드릴게요</p>
      </div>

      <div className="flex items-center justify-center w-[80%] h-[6rem]"></div>
    </div>
  );
};
export default PosePage;
