import React from 'react';
import { Container, Img } from '../../../../components';
import s from './HowItWorks.module.css';

export const HowItWorks = () => {
  return (
    <section className={s.howItWorks}>
      <Container>
        <h2 className={s.sectionTitle}>How It Works</h2>
        <div className={s.steps}>
          <div className={s.step}>
            <div className={s.stepNumber}>1</div>
            <h3 className={s.stepTitle}>Choose a Billionaire</h3>
            <p className={s.stepText}>Explore the list of the world's richest people</p>
          </div>
          <div className={s.step}>
            <div className={s.stepNumber}>2</div>
            <h3 className={s.stepTitle}>Analyze Their Wealth</h3>
            <p className={s.stepText}>Learn about their net worth and income sources</p>
          </div>
          <div className={s.step}>
            <div className={s.stepNumber}>3</div>
            <h3 className={s.stepTitle}>Simulate Spending</h3>
            <p className={s.stepText}>Compare prices and spend like a billionaire</p>
          </div>
        </div>
      </Container>
    </section>
  );
};