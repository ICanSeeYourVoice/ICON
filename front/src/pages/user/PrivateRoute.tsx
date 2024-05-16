import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/user";

const PrivateRoute: React.FC = () => {
  const { access_token } = useUserStore();
  const navigate = useNavigate();

  if (!access_token) {
    navigate("/");
    return;
  }

  return <Outlet />;
};

export default PrivateRoute;
