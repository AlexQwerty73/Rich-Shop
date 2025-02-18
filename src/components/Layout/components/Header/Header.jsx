import React, { useState } from 'react';
import { Container, Img } from '../../../common';
import s from './header.module.css';
import { Nav } from './components/Nav';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const list = [
    { "name": "Home", "link": "/" },
    { "name": "People", "link": "/choose-a-person" },
  ];

  return (
    <div className={s.header}>
      <Container>
        <div className={s.content}>
          <div className={s.logo}>
            <Img folder='logo' img='logo' type='png' alt='logo' />
          </div>

          <div 
            className={`${s.menuToggle} ${isMenuOpen ? s.active : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <Nav list={list} className={isMenuOpen ? s.active : ''} />
        </div>
      </Container>
    </div>
  );
};