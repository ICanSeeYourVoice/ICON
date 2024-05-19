import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/user";
import useMemberInfo from "../../hooks/useMemberInfo";

const PrivateRoute: React.FC = () => {
  const { access_token } = useUserStore();
  const navigate = useNavigate();
  const { memberInfo, isLoading, isError } = useMemberInfo();

  if (!access_token) {
    navigate("/");
    return;
  }
  if (!isLoading && !memberInfo && isError) {
    useUserStore.setState({ access_token: "" });
    useUserStore.persist.clearStorage();
    navigate("/login", { replace: true });
    return;
  }

  return <Outlet />;
};

export default PrivateRoute;
