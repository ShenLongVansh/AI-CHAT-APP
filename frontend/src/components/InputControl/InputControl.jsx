import React, { useState } from "react";
import styles from "./InputControl.module.css";
import hidePng from "../../assets/hide.png"
import showPng from "../../assets/show.png"

function InputControl({ label, type = "text", ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";
  const showImage = ""

  return (
    <div className={styles.container} style={{ position: "relative" }}>
      {label && <label>{label}</label>}
      <input
        type={isPasswordType && !showPassword ? "password" : "text"}
        {...props}
      />
      {isPasswordType && (
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          style={{
            position: "absolute",
            right: "10px",
            top: "38px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontFamily: "Chakra Petch, sans-serif",
            color: "#555"
          }}
        >
          <img src={showPassword ? hidePng : showPng} width={30} height={20}  alt={showPassword ? "Hide" : "Show"}> 
          
          </img>
        </span>
      )}
    </div>
  );
}

export default InputControl;
