import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          Copyright © 2023 AI CHAT APP. Designed By{" "}
          <a href="https://www.linkedin.com/in/vansh-sharma-4a6882245/">Vansh Sharma</a>
        </p>
      </div>
      <div className={styles.handles}>
        <a href="https://github.com/ShenLongVansh">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/vansh-sharma-4a6882245/">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
