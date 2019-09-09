import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import BookForm from '../components/BookForm';
import ViewWrap from '../components/styled/ViewWrap';
import { CREATE_BOOK, GET_BOOKS } from '../api';

export default function Create({ history }) {
  const [createBook, { loading, error, data }] = useMutation(CREATE_BOOK, {
    update(
      cache,
      {
        data: { createBook },
      }
    ) {
      const { books } = cache.readQuery({ query: GET_BOOKS });
      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: books.concat([createBook]) },
      });
    },
  });

  const handleSubmit = book => {
    createBook({ variables: { ...book } });
  };

  const handleReset = () => {
    history.replace('/');
  };

  return (
    <ViewWrap>
      <h3>Create new book</h3>

      <BookForm
        onSubmit={handleSubmit}
        onReset={handleReset}
        shouldReset={data && data.createBook}
      />

      {loading && <p>creating..</p>}
      {error && <p>error creating book, try again :(</p>}
      {data && data.createBook && <p>book added!!</p>}
    </ViewWrap>
  );
}
