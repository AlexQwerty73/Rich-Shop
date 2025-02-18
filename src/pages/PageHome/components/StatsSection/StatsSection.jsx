import React from 'react';
import { Container, Img } from '../../../../components';
import s from './StatsSection.module.css';

export const StatsSection = () => {
  return (
    <section className={s.stats}>
      <Container>
        <div className={s.statsGrid}>
          <div className={s.statItem}>
            <h3 className={s.statNumber}>$1.5T+</h3>
            <p className={s.statText}>Total Wealth</p>
          </div>
          <div className={s.statItem}>
            <h3 className={s.statNumber}>500+</h3>
            <p className={s.statText}>Spending Options</p>
          </div>
          <div className={s.statItem}>
            <h3 className={s.statNumber}>100+</h3>
            <p className={s.statText}>Billionaires</p>
          </div>
        </div>
      </Container>
    </section>
  );
};
