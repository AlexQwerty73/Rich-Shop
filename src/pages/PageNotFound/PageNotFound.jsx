import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../../components';
import s from './PageNotFound.module.css';

export const PageNotFound = () => {
  return (
    <div className={s.wrapper}>
      <Container>
        <div className={s.content}>
          <div className={s.errorCode}>
            4
            <span className={s.animatedZero}>
              <span className={s.zeroInner}>0</span>
            </span>
            4
          </div>
          
          <h1 className={s.title}>Page Not Found</h1>
          
          <p className={s.text}>
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          
          <NavLink to="/" className={s.homeButton}>
            Back to Home
          </NavLink>
        </div>
      </Container>
    </div>
  );
};