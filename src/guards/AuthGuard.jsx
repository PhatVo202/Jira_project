import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";

export default function AuthGuard() {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userState.userInfo) {
      notification.error({
        message: "Đăng nhập để tiếp tục vào trang!",
      });
      navigate("/login");
    }
  }, []);

  return <Outlet />;
}
