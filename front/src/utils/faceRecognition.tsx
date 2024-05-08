import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
// import tf from '@tensorflow/tfjs-node';
import * as faceapi from "@vladmandic/face-api";
// console.log(faceapi.nets);

const FaceRecognizerCam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const camMediaStream = useRef<MediaStream | null>(null);
  const intervalDetection = useRef<number | null>(null); // 타입을 number로 선언
  const [featuresDetected, setFeaturesDetected] = useState({
    hasEyes: false,
    hasNose: false,
    hasMouth: false,
  });

  useEffect(() => {
    if (
      faceapi.nets.ssdMobilenetv1.isLoaded &&
      faceapi.nets.faceLandmark68Net.isLoaded
    ) {
      startVideo();
      return;
    }

    const loadModels = async () => {
      const MODEL_URL = "src/model";
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        startVideo();
      } catch (error) {
        console.error("Model loading failed", error);
        toast.error("Failed to load face detection models.");
      }
    };

    loadModels();
  }, []);

  // cleanup function for webcam usage
  useEffect(() => {
    return () => {
      camMediaStream.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [camMediaStream]);

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
        const video = videoRef.current!;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Problem accessing the webcam. Ensure permission has been granted."
        );
      });
  };

  useEffect(() => {
    if (intervalDetection.current) clearInterval(intervalDetection.current);

    detectFaceFeatures();

    return () => {
      if (intervalDetection.current) clearInterval(intervalDetection.current);
    };
  }, [videoRef.current]);

  // sets intervalTimer that keeps detecting face features
  const detectFaceFeatures = () => {
    if (!videoRef.current) return;

    intervalDetection.current = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current)
        .withFaceLandmarks();
      if (detections.length > 0) {
        console.log(detections);
        const { landmarks } = detections[0];
        const hasEyes =
          landmarks.getLeftEye().length > 0 &&
          landmarks.getRightEye().length > 0;
        const hasNose = landmarks.getNose().length > 0;
        const hasMouth = landmarks.getMouth().length > 0;

        setFeaturesDetected({ hasEyes, hasNose, hasMouth });
      }
    }, 1000) as unknown as number; // NodeJS.Timer를 number로 강제 변환
  };

  return (
    <div className="relative">
      <video ref={videoRef} />
      <p>Has eyes: {featuresDetected.hasEyes.toString()}</p>
      <p>Has nose: {featuresDetected.hasNose.toString()}</p>
      <p>Has mouth: {featuresDetected.hasMouth.toString()}</p>
    </div>
  );
};
export { FaceRecognizerCam };
