import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Edit from '../assets/edit.png';
import { TOGGLE_BOOK, GET_TOTAL_PRICE, GET_BOOKS } from '../api';

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
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
`;
const BookEdit = styled(Link)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
const BookEditImg = styled.img`
  width: 2rem;
`;

const BookLabel = styled.label`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;

/**
 * @desc single book components
 * display all info regarding the book
 * integrate edit link
 */
export default function Book({ book }) {
  const [toggleBook] = useMutation(TOGGLE_BOOK, {
    variables: { bookId: book.bookId },
    // update book.isSelected field and recalculate totalPrice
    update: (cache, { data: { toggleBook } }) => {
      try {
        const { books } = cache.readQuery({ query: GET_BOOKS });
        const newBooks = books.map(b => {
          if (b.bookId === toggleBook) {
            b.isSelected = !b.isSelected;
          }
          return b;
        });
        cache.writeQuery({
          query: GET_BOOKS,
          data: { books: newBooks },
        });
      } catch (err) {
        console.error('books not fetched');
      }
    },
    refetchQueries: [{ query: GET_TOTAL_PRICE }],
    awaitRefetchQueries: true,
  });

  return (
    <BookWrap>
      <b>{book.bookId}</b>
      <BookTitle>{book.title}</BookTitle>
      <BookAuthor>{book.author}</BookAuthor>
      <BookPrice>{book.price} $</BookPrice>
      <BookEdit to={`/edit/${book.bookId}`}>
        <BookEditImg src={Edit} alt='edit book' title='edit book' />
      </BookEdit>

      <BookLabel>
        {!book.isSelected ? 'add' : 'remove'}
        <input
          type='checkbox'
          name='selected'
          checked={book.isSelected}
          onChange={toggleBook}
        />
      </BookLabel>
    </BookWrap>
  );
}
