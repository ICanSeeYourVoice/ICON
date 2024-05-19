import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { handleAllowNotification } from "./service/notificationPermission";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useNotificationStore, useTokenStore } from "./stores/notification";
import { messageHandler } from "./service/foregroundMessage";

const queryClient = new QueryClient();

function App() {
  const notification = useNotificationStore((state: any) => state.notification);
  const setNotification = useNotificationStore(
    (state: any) => state.setNotification
  );

  const { token, setToken } = useTokenStore();

  /* Notification setting */
  const notify = () => {
    const toastId = toast(<ToastDisplay />);

    setTimeout(() => {
      toast.dismiss(toastId);
    }, 1500);
  };

  const ToastDisplay = () => {
    const currentTime = new Date().toLocaleTimeString();

    return (
      <div className="flex flex-col gap-2 text-sm w-full">
        <div className="flex justify-between">
          <p>
            <b>👶 {notification?.title}</b>
          </p>
          <span className=" text-gray-1 text-xs ml-[0.5rem]">
            {currentTime}
          </span>
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
