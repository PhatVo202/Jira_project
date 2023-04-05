import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  const userReducer = useSelector((state) => state.userReducer.userInfo);
  const isMobile = useMediaQuery({ query: `(max-width:400px)` });

  return (
    <div className="container">
      <div
        className={isMobile && "py-5 mt-5"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ objectFit: "cover" }}
          src="./img/notfound.png"
          alt="notfound"
          width={isMobile && 400}
          height={isMobile && 300}
        />
      </div>
      <div className="text-center">
        <NavLink to={userReducer ? "/login" : "/projectmanagement"}>
          Back to home
        </NavLink>
      </div>
    </div>
  );
}
