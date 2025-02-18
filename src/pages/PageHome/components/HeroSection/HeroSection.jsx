import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Img } from '../../../../components';
import s from './HeroSection.module.css';

export const HeroSection = () => {
  return (
    <section className={s.hero}>
      <Container>
        <div className={s.heroContent}>
          <div className={s.textBlock}>
            <h1 className={s.title}>
              Feel Like a <span className={s.highlight}>Billionaire</span>
            </h1>
            <p className={s.subtitle}>
              Discover how to spend the fortunes of the world's wealthiest people
            </p>
            <NavLink to="/choose-a-person" className={s.ctaButton}>
              Start Game →
            </NavLink>
          </div>
          <div className={s.heroImage}>
            <Img folder="home" img="money" type="png" alt="Money" />
          </div>
        </div>
      </Container>
    </section>
  );
};

