import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './BackButton.module.css';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className={s.button}
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <div className={s.buttonInner}>
        <svg
          className={s.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className={s.text}>Return to List</span>
      </div>
    </button>
  );
};