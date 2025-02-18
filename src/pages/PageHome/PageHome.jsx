import React from 'react';
import s from './PageHome.module.css';
import {CTASection, HeroSection, HowItWorks, StatsSection} from './components';

export const PageHome = () => {
  return (
    <div className={s.wrapper}>
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <CTASection />
    </div>
  );
};