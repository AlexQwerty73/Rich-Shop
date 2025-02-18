import React from 'react';
import { Container } from '../../components';
import { RichList } from '../../components';
import { useGetRichHumansQuery } from '../../redux';
import s from './PageRichPeople.module.css';

export const PageRichPeople = () => {
  const { data: richPeople = [], isLoading, error } = useGetRichHumansQuery();

  if (isLoading) return <div className={s.loading}>Loading billionaires...</div>;
  if (error) return <div className={s.error}>Error: {error.message}</div>;

  return (
    <div className={s.wrapper}>
      <Container>
        <div className={s.content}>
          <h1 className={s.h1}>Choose a rich person to spend his money!</h1>
          <RichList items={richPeople} />
        </div>
      </Container>
    </div>
  );
};