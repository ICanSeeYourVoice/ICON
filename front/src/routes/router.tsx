import { createBrowserRouter } from "react-router-dom";
import DarkCommonLayout from "../components/common/layout/DarkCommonLayout";
import DetectionPage from "../pages/detection/DetectionPage";
import LoginPage from "../pages/user/LoginPage";
import JoinPage from "../pages/user/JoinPage";
import AuthLayout from "../pages/user/AuthLayout";
import SplashPage from "../pages/user/Splash";

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

const routes = [...authRoutes, ...detectionRoutes];

const router = createBrowserRouter(routes);

export default router;
