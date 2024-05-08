import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import * as faceapi from "face-api.js";

interface aa { hasEyes:boolean; hasNose:boolean; hasMouth:boolean;}

const FaceRecognizerCam = ( onFeaturesDetected : aa ) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const camMediaStream = useRef<MediaStream | null>(null);
    const intervalDetection = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        toast.dismiss();
        toast(
            "A detecção de expressões demanda mais recursos, o que pode causar travamentos em celulares e outros dispositivos mais limitados.",
            {
                duration: 8000
            }
        );

        if (faceapi.nets.faceLandmark68Net.isLoaded && faceapi.nets.faceLandmark68TinyNet.isLoaded) {
            startVideo();
            return;
        }

        const loadModels = async () => {
            const MODEL_URL = "/model";
            try {
                await Promise.all([
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
                ]);
                startVideo();
            } catch (error) {
                console.error("Model loading failed", error);
                toast.error("Failed to load face detection models.");
            }
            // Promise.all([
            //     faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            //     faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
            // ]).then(startVideo);
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
                toast.error("Ocorreu algum problema ao acessar a webcam. Assegure-se de que a pemissão foi concedida.");
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
            const detection = await faceapi
                .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (detection) {
                const landmarks = detection.landmarks;
                const hasEyes = landmarks.getLeftEye().length > 0 && landmarks.getRightEye().length > 0;
                const hasNose = landmarks.getNose().length > 0;
                const hasMouth = landmarks.getMouth().length > 0;

                console.log("Has eyes:", hasEyes);
                console.log("Has nose:", hasNose);
                console.log("Has mouth:", hasMouth);

                // Pass detected features to parent component
                onFeaturesDetected({ hasEyes, hasNose, hasMouth });
            }
        }, 100);
    };

    return (
        <div
        className= "relative" >
        <video ref={ videoRef } />
            </div>
        
        );
}

export default FaceRecognizerCam;