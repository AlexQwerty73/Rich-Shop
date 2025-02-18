import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './BackToListButton.module.css';

export const BackToListButton = () => {
   const navigate = useNavigate();

   return (
      <button
         className={s.button}
         onClick={() => navigate(-1)}
         aria-label="Go back"
      >
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
               d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
         </svg>
         <span className={s.text}>Back to List</span>
      </button>
   );
};