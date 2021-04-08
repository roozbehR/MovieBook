import React from "react";
import styles from "./loading-spin.module.css";
import { Spin } from 'antd'

export default function LoadingSpin(){
  return(
      <div className={styles.spinLoading}>
        <Spin />
      </div>
  );
}
