import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useGetRichHumansQuery } from '../../redux';
import { Container, BackToListButton } from '../../components';
import s from './PageRichPerson.module.css';

export const PageRichPerson = () => {
   const { personId } = useParams();
   const { data: richPeople = [], isLoading, error } = useGetRichHumansQuery(personId);

   if (isLoading) return <div className={s.loading}>Loading...</div>;
   if (error) return <div className={s.error}>Error: {error.message}</div>;

   const richPerson = richPeople[0];

   return (
      <Container>
         <div className={s.profile}>
            <div className={s.header}>

               <div className={s.backButton}>
                  <BackToListButton />
               </div>

               <h1 className={s.title}>{richPerson.name} {richPerson.surname}</h1>
               <p className={s.age}>Age: {richPerson.age}</p>
               <div className={s.wealthContainer}>
                  <span className={s.wealthLabel}>Total Wealth:</span>
                  <span className={s.wealth}>${richPerson.wealth?.toLocaleString()}</span>
               </div>
            </div>

            <div className={s.details}>
               <div className={s.section}>
                  <h3 className={s.sectionTitle}>Biography</h3>
                  <p className={s.bio}>{richPerson.bio}</p>
               </div>

               <div className={s.section}>
                  <h3 className={s.sectionTitle}>Companies</h3>
                  <ul className={s.companiesList}>
                     {richPerson.companies?.map(company => (
                        <li key={company.name} className={s.companyItem}>
                           <span className={s.companyName}>{company.name}</span>
                           <span className={s.companyValue}>${company.value?.toLocaleString()}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               <div className={s.section}>
                  <h3 className={s.sectionTitle}>Residence</h3>
                  <p className={s.residence}>{richPerson.residence}</p>
               </div>
            </div>

            <NavLink
               to={`/spend/${personId}`}
               className={s.spendButton}
            >
               Start Spending Strategy
            </NavLink>
         </div>
      </Container>
   );
};