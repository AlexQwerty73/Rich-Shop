import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './RichList.module.css';

export const RichList = ({ items }) => {
  return (
    <ul className={s.richList}>
      {items.map(person => (
        <li key={person.id} className={s.richListItem}>
          <NavLink 
            to={`/choose-a-person/${person.id}`}
            className={s.cardLink}
            state={{ personData: person }}
          >
            <div className={s.richListContent}>
              <h2 className={s.richListName}>
                {person.name} {person.surname}
              </h2>
              <p className={s.richListAge}>Age: {person.age}</p>
              <p className={s.richListWealth}>
                Fortune: ${person.wealth?.toLocaleString()}
              </p>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};