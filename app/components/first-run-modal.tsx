"use client";

import React from "react";
import styles from "./first-run-modal.module.scss";

export default function FirstRunModal(props: { onClose: () => void }) {
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h3 className={styles.title}>Welcome to Tonomy Shadow Chat</h3>
        <div className={styles.content}>
          <p>
            Shadow Chat is a research project in sovereign AI. It runs models
            directly in your browser for maximum privacy and control.
          </p>
          <ul className={styles.bullets}>
            <li>Works on modern desktop browsers only at the moment.</li>
            <li>
              Responses may be less accurate than cloud LLMs due to limited,
              on-device models.
            </li>
            <li>
              Your chats are fully private and stored only on your device. They
              are never sent to external servers.
            </li>
          </ul>
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={props.onClose}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
