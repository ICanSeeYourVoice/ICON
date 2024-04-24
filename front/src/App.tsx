import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { handleAllowNotification } from "./service/notificationPermission";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useNotificationStore } from "./stores/notification";
import { messageHandler } from "./service/foregroundMessage";

const queryClient = new QueryClient();

function App() {
  const notification = useNotificationStore((state: any) => state.notification);
  const setNotification = useNotificationStore(
    (state: any) => state.setNotification
  );

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

  handleAllowNotification();

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
