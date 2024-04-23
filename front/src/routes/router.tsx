import { createBrowserRouter } from "react-router-dom";
import DarkCommonLayout from "../components/common/layout/DarkCommonLayout";
import DetectionPage from "../pages/detection/DetectionPage";
import LoginPage from "../pages/user/LoginPage";
import JoinPage from "../pages/user/JoinPage";
import AuthLayout from "../pages/user/AuthLayout";
import SplashPage from "../pages/user/Splash";
import RecordLayout from "../pages/record/RecordLayout";
import RecordPage from "../pages/record/RecordPage";
import DiaryPage from "../pages/record/DiaryPage";
import DiaryDetailPage from "../pages/record/DiaryDetailPage";
import RegisterPage from "../pages/record/RegisterPage";
import ChartPage from "../pages/record/ChartPage";

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
    children: [{ index: true, element: <DetectionPage /> }],
  },
];

const recordRoutes = [
  {
    path: "/record",
    element: <RecordLayout />,
    children: [
      { index: true, element: <RecordPage /> },
      { path: "diary", element: <DiaryPage /> },
      { path: "detail/diary", element: <DiaryDetailPage /> },
      { path: "diary/register", element: <RegisterPage /> },
      { path: ":chart", element: <ChartPage /> },
    ],
  },
];

const routes = [...authRoutes, ...detectionRoutes, ...recordRoutes];

const router = createBrowserRouter(routes);

export default router;