import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Edit from '../assets/edit.png';

const BookWrap = styled.div`
  position: relative;
  border: 1px solid #e3e3e3;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
`;
const BookTitle = styled.h2`
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
`;
const BookAuthor = styled.h4`
  font-size: 1.8rem;
  margin: 0 0 0.5rem 0;
`;
const BookPrice = styled.p`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  margin: 0;
  font-size: 1rem;
`;
const BookEdit = styled(Link)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
const BookEditImg = styled.img`
  width: 2rem;
`;

export default function Book({ book }) {
  return (
    <BookWrap>
      <b>{book.bookId}</b>
      <BookTitle>{book.title}</BookTitle>
      <BookAuthor>{book.author}</BookAuthor>
      <BookPrice>{book.price} $</BookPrice>
      <BookEdit to={`/edit/${book.bookId}`}>
        <BookEditImg src={Edit} alt='edit book' title='edit book' />
      </BookEdit>
    </BookWrap>
  );
}
