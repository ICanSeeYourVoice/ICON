import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "./initFirebase";

const messaging = getMessaging(app);

export const messageHandler = (
  setNotification: React.Dispatch<
    React.SetStateAction<{ title: string; body: string }>
  >
) => {
  onMessage(messaging, (payload: any) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    setNotification({
      title: payload?.notification?.title,
      body: payload?.notification?.body,
    });

    if (Notification.permission === "granted") {
      new Notification(notificationTitle, notificationOptions);
    }
  });
};
