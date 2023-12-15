import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function NoAuthGuard() {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (userState.userInfo) {
      navigate("/jira/projectmanagement");
    }
  }, []);
  return <Outlet />;
}
