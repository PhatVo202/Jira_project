import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";
import ProjectDetail from "../pages/projectdetail/ProjectDetail";

export default function AuthGuardProjectDetail() {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.userInfo) {
      notification.error({
        message: "Đăng nhập để tiếp tục vào trang!",
      });
    }
  }, []);

  const isLogin = !userState.userInfo ? <Outlet /> : <ProjectDetail />;

  return isLogin;
}
