import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ViewWrap from '../components/styled/ViewWrap';
import { GET_BOOKS, GET_TOTAL_PRICE, GET_SELECTED_BOOKS } from '../api';
import Book from '../components/Book';

const RouteLink = styled(Link)`
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

const TotalBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #e3e3e3;
  margin: 1rem 0;

  p {
    margin: 0;
  }
`;

const BooksList = styled.div`
  overflow: auto;
  max-height: 50rem;
`;

/**
 * @desc show total details
 * show add more link
 * show book list
 */
export default function List() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const { data: priceData } = useQuery(GET_TOTAL_PRICE);
  const { data: selectedData } = useQuery(GET_SELECTED_BOOKS);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <ViewWrap>
      <TotalBox>
        <div>
          <p>
            total books selected:{' '}
            {selectedData && selectedData.selectedBooks.length}
          </p>
          <p>total price: {priceData && priceData.totalPrice}$</p>
        </div>

        <RouteLink to='/create'>+</RouteLink>
      </TotalBox>

      <BooksList>
        {data.books.map(book => (
          <Book key={book.bookId} book={book} />
        ))}
      </BooksList>
    </ViewWrap>
  );
}
