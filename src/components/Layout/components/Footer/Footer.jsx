import React from 'react';
import { Container, Img } from '../../../common';
import s from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.content}>
          <div className={s.logoBlock}>
            <div className={s.logo}>
              <span className={s.logoIcon}>
                <Img folder='logo' img='logo' type='png' alt='logo' />
              </span>
              <span className={s.logoText}>Capital Play</span>
            </div>
          </div>

          <div className={s.divider}></div>

          <div className={s.bottom}>
            <div className={s.legal}>
              <span>© {new Date().getFullYear()}</span>
              <span className={s.dot}>•</span>
              <span>Virtual Wealth Simulator</span>
            </div>
            <div className={s.disclaimer}>
              *Simulation experience of capital management
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};