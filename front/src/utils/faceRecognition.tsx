import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
// import tf from '@tensorflow/tfjs-node';
import * as faceapi from "@vladmandic/face-api";

const FaceRecognizerCam = ({ featuresDetected, setFeaturesDetected }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const camMediaStream = useRef<MediaStream | null>(null);
  const intervalDetection = useRef<number | null>(null); // 타입을 number로 선언
  const [modelsLoaded, setModelsLoaded] = useState(false);
  // const [featuresDetected, setFeaturesDetected] = useState({
  //   hasLeftEyes: false,
  //   hasRightEyes: false,
  //   hasNose: false,
  //   hasMouth: false,
  // });

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "src/model";
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        // startVideo();
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
        // const video = videoRef.current!;
        // video.srcObject = stream;
        // video.play();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Problem accessing the webcam. Ensure permission has been granted.");
      });
  };

  // useEffect(() => {
  //   if (intervalDetection.current) clearInterval(intervalDetection.current);

  //   detectFaceFeatures();

  //   return () => {
  //     if (intervalDetection.current) clearInterval(intervalDetection.current);
  //   };
  // }, [videoRef.current]);

  // sets intervalTimer that keeps detecting face features
  // const detectFaceFeatures = () => {
  //   if (!videoRef.current) return;

  //   intervalDetection.current = setInterval(async () => {
  //     const detections = await faceapi
  //       .detectAllFaces(videoRef.current)
  //       .withFaceLandmarks();

  //     if (detections.length > 0) {
  //       // console.log(detections);
  //       const { landmarks } = detections[0];
  //       const hasEyes =
  //         landmarks.getLeftEye().length > 0 &&
  //         landmarks.getRightEye().length > 0;
  //       const hasNose = landmarks.getNose().length > 0;
  //       const hasMouth = landmarks.getMouth().length > 0;
  //       console.log("eyes : " , hasEyes, " nose : ", hasNose, " mouth : ", hasMouth);

  //       setFeaturesDetected({ hasEyes, hasNose, hasMouth });
  //     }
  //   }, 1000) as unknown as number; // NodeJS.Timer를 number로 강제 변환
  // };

  useEffect(() => {
    const detectFaceFeatures = async () => {
      const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
        minConfidence: 0.2,
      });

      if (!videoRef.current) return;

      intervalDetection.current = window.setInterval(async () => {
        const detections = await faceapi
          .detectSingleFace(videoRef.current, optionsSSDMobileNet)
          .withFaceLandmarks();

        if (detections) {
          setFeaturesDetected((prevState) => ({
            hasLeftEyes: detections.landmarks.getLeftEye().length > 0,
            hasRightEyes: detections.landmarks.getRightEye().length > 0,
            hasNose: detections.landmarks.getNose().length > 0,
            hasMouth: detections.landmarks.getMouth().length > 0,
          }));

          console.log(detections?.landmarks.getLeftEyeBrow());
          console.log(detections?.landmarks.getLeftEye());
          console.log(detections?.detection.score);
        } else {
          
          setFeaturesDetected((prevState) => ({
            hasLeftEyes: false,
            hasRightEyes: false,
            hasNose: false,
            hasMouth: false,
          }));
          console.log("no face");
        } 

        
        // console.log(featuresDetected);
      }, 1000);
    };

    detectFaceFeatures();

    return () => {
      if (intervalDetection.current) clearInterval(intervalDetection.current);
    };
  }, [videoRef.current]);

  return (
    <div className="relative">
      <video ref={videoRef} style={{ transform: "scaleX(-1)" }} />
      {/* <p>Has Left eyes: {featuresDetected.hasLeftEyes.toString()}</p>
      <p>Has Right eyes: {featuresDetected.hasRightEyes.toString()}</p>
      <p>Has nose: {featuresDetected.hasNose.toString()}</p>
      <p>Has mouth: {featuresDetected.hasMouth.toString()}</p> */}
    </div>
  );
};
export { FaceRecognizerCam };
