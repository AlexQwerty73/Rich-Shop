import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Img } from '../../../../components';
import s from './CTASection.module.css';

export const CTASection = () => {
  return (
    <section className={s.ctaSection}>
      <div className={s.waveDivider}></div>
      <Container>
        <div className={s.ctaBox}>
          <h2 className={s.ctaTitle}>Ready to Start?</h2>
          <p className={s.ctaText}>Select your first billionaire and begin the experiment</p>
          <NavLink to="/choose-a-person" className={s.ctaButton}>
            Choose Now
          </NavLink>
        </div>
      </Container>
    </section>
  );
};