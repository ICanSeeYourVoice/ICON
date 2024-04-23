import { createBrowserRouter } from "react-router-dom";
import DarkCommonLayout from "../components/common/layout/DarkCommonLayout";
import DetectionPage from "../pages/detection/DetectionPage";

const detectionRoutes = [
  {
    path: "/",
    element: <DarkCommonLayout title="울음감지" />,
    children: [{ index: true, element: <DetectionPage /> }],
  },
];

const routes = [...detectionRoutes];

const router = createBrowserRouter(routes);

export default router;
