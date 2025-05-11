import React, { useState } from "react";
import styles from "./InputControl.module.css";

function InputControl({ label, type = "text", ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

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
          {showPassword ? "Hide" : "Show"}
        </span>
      )}
    </div>
  );
}

export default InputControl;
