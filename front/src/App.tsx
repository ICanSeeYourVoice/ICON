import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { handleAllowNotification } from "./service/notificationPermission";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useNotificationStore, useTokenStore } from "./stores/notification";
import { messageHandler } from "./service/foregroundMessage";
import { useDetectionStore } from "./stores/detection";
import {
  loadYamnetModel,
  processAudioData,
} from "./utils/cryingClassification";
import * as tf from "@tensorflow/tfjs";

const queryClient = new QueryClient();

function App() {
  const notification = useNotificationStore((state: any) => state.notification);
  const setNotification = useNotificationStore(
    (state: any) => state.setNotification
  );

  const model = useRef<tf.GraphModel | null>(null);
  const isBabyCry = useDetectionStore((state: any) => state.isBabyCry);
  const setIsBabyCry = useDetectionStore((state: any) => state.setIsBabyCry);
  const setCryingType = useDetectionStore((state: any) => state.setCryingType);
  const streamRef = useRef<MediaStream | null>(null);
  const { token, setToken } = useTokenStore();

  /* Notification setting */
  const notify = () => toast(<ToastDisplay />);
  const ToastDisplay = () => {
    const currentTime = new Date().toLocaleTimeString();

    return (
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex  justify-between">
          <p>
            <b>👶 {notification?.title}</b>
          </p>
          <span className=" text-gray-1 text-xs">{currentTime}</span>
        </div>
        <div>{notification?.body}</div>
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  messageHandler(setNotification);

  useEffect(() => {
    const getTokenAndSet = async () => {
      const newToken = await handleAllowNotification();
      if (newToken) {
        setToken(newToken);
      }
    };

    if (!token) {
      getTokenAndSet();
    }
  }, [token, setToken]);

  /* Detection setting */
  useEffect(() => {
    const fetchDataAndProcess = async () => {
      let toastId;
      console.log(streamRef.current);

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

          scriptNode.onaudioprocess = processAudioData(
            yamnet,
            setIsBabyCry,
            setCryingType
          );

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

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
