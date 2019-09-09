import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ViewWrap from '../components/styled/ViewWrap';
import { GET_BOOKS } from '../api';
import Book from '../components/Book';

const RouteLink = styled(Link)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  background-color: #234e23;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  border-radius: 50%;
`;

export default function List() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <ViewWrap>
      {data.books.map(book => (
        <Book key={book.bookId} book={book} />
      ))}

      <RouteLink to="/create">+</RouteLink>
    </ViewWrap>
  );
}
