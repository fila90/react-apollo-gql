import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import BookForm from '../components/BookForm';
import ViewWrap from '../components/styled/ViewWrap';
import { GET_SINGLE_BOOK } from '../api';

export default function Edit({ match, history }) {
  const id = match.params.id;
  if (!id) history.replace('/');

  const handleSubmit = book => {
    console.log(book);
  };

  const handleReset = e => {
    history.replace('/');
  };

  const { loading, error, data } = useQuery(GET_SINGLE_BOOK, {
    variables: { id },
  });

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <ViewWrap>
      <BookForm
        book={data.book}
        onReset={handleReset}
        onSubmit={handleSubmit}
      />
    </ViewWrap>
  );
}
