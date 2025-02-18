import React from 'react';
import s from '../header.module.css';
import { NavLink } from 'react-router-dom';

export const Nav = ({ list }) => {
   return (
     <nav className={s.nav}>
       <ul>

         {list.map((item, index) => (
           <li key={index}>
             <NavLink
               to={item.link}
               className={({ isActive }) => (isActive ? `${s.active}` : '')}
             >
               {item.name}
             </NavLink>
           </li>
         ))}
         
       </ul>
     </nav>
   );
 };