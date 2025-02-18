import React from 'react';
import { Link, useParams } from 'react-router-dom';
import s from './Pagination.module.css';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { personId } = useParams();
  
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (totalPages > maxVisible && end - start < maxVisible - 1) {
      start = end - maxVisible + 1;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={s.pagination}>
      {currentPage > 1 && (
        <Link
          to={`/spend/${personId}/${currentPage - 1}`}
          className={s.pageItem}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Link>
      )}

      {getPageNumbers().map(page => (
        <Link
          key={page}
          to={`/spend/${personId}/${page}`}
          className={`${s.pageItem} ${currentPage === page ? s.active : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          to={`/spend/${personId}/${currentPage + 1}`}
          className={s.pageItem}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Link>
      )}
    </div>
  );
};