import { getMessaging, getToken } from "firebase/messaging";
import { registerServiceWorker } from "./registerServiceWorker";
import { app } from "./initFirebase";
import toast from "react-hot-toast";

export async function handleAllowNotification() {
  registerServiceWorker();
  try {
    const permission = await Notification.requestPermission();

    const messaging = getMessaging(app);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
        console.log(token);

        return token;
      } else {
        toast.error(
          "토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요"
        );
      }
    } else if (permission === "denied") {
      toast.error("알림 권한을 허용해주세요");
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}
