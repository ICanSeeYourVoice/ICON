import { createBrowserRouter } from "react-router-dom";
import DarkCommonLayout from "../components/common/layout/DarkCommonLayout";
import DetectionPage from "../pages/detection/DetectionPage";
import LoginPage from "../pages/user/LoginPage";
import JoinPage from "../pages/user/JoinPage";
import AuthLayout from "../pages/user/AuthLayout";
import SplashPage from "../pages/user/Splash";
import RecordLayout from "../components/common/layout/RecordLayout";
import RecordPage from "../pages/record/RecordPage";
import DiaryDetailPage from "../pages/record/DiaryDetailPage";
import RegisterPage from "../pages/record/RegisterPage";
import ChartPage from "../pages/record/ChartPage";
import ChatLayout from "../pages/chat/ChatLayout";
import ChatPage from "../pages/chat/ChatPage";
import CommonLayout from "../components/common/layout/CommonLayout";
import SettingPage from "../pages/setting/SettingPage";
import AccountPage from "../pages/setting/account/AccountPage";
import RegisterMultiNotificationPage from "../pages/setting/notification/RegisterMultiNotificationPage";
import SmartThingsPage from "../pages/setting/smartThings/SmartThingsPage";
import QRScanPage from "../pages/setting/notification/QRScanPage";
import ResultPage from "../pages/detection/ResultPage";
import VoiceLayout from "../components/common/layout/VoiceLayout";
import ClovaVoicePage from "../pages/tts/ClovaVoicePage";
import SettingRoutinePage from "../pages/setting/smartThings/SettingRoutinePage";
import PosePage from "../pages/detection/PosePage";

const authRoutes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <SplashPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/join", element: <JoinPage /> },
    ],
  },
];
const detectionRoutes = [
  {
    path: "/detection",
    element: <DarkCommonLayout title="울음감지" />,
    children: [
      { index: true, element: <DetectionPage /> },
      { path: "/detection/result", element: <ResultPage /> },
    ],
  },
];

const recordRoutes = [
  {
    path: "/record",
    element: <RecordLayout />,
    children: [
      { index: true, element: <RecordPage /> },
      { path: "detail/diary", element: <DiaryDetailPage /> },
      { path: "diary/register", element: <RegisterPage /> },
      { path: ":chart", element: <ChartPage /> },
    ],
  },
];

const chatRoutes = [
  {
    path: "/chat",
    element: <ChatLayout />,
    children: [{ index: true, element: <ChatPage /> }],
  },
];

const settingRoutes = [
  {
    path: "/setting",
    element: <CommonLayout title="설정" />,
    children: [{ index: true, element: <SettingPage /> }],
  },
];

const settingNavRoutes = [
  { path: "/setting/account", element: <AccountPage /> },
  { path: "/setting/share", element: <RegisterMultiNotificationPage /> },
  { path: "/setting/scan", element: <QRScanPage /> },
  { path: "/setting/things", element: <SmartThingsPage /> },
  { path: "/setting/things/routine", element: <SettingRoutinePage /> },
];

const voiceRoutes = [
  {
    path: "/voice",
    element: <VoiceLayout />,
    children: [{ index: true, element: <ClovaVoicePage /> }],
  },
]; 

const poseRoutes = [
  {
    path: "/pose",
    element: <DarkCommonLayout title="자세감지" />,
    children: [
      { index: true, element: <PosePage /> },
      // { path: "/detection/result", element: <PoseResultPage /> },
    ],
  },
];

const routes = [
  ...authRoutes,
  ...detectionRoutes,
  ...recordRoutes,
  ...chatRoutes,
  ...settingRoutes,
  ...settingNavRoutes,
  ...voiceRoutes,
  ...poseRoutes,
];

const router = createBrowserRouter(routes);

export default router;
