import React from "react";

export default function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <img
        style={{ objectFit: "cover" }}
        src="./img/notfound.png"
        alt="notfound"
      />
      <button className="btn btn-primary">Back to home</button>
    </div>
  );
}
