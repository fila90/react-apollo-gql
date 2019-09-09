import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import BookForm from '../components/BookForm';
import ViewWrap from '../components/styled/ViewWrap';
import { GET_SINGLE_BOOK, EDIT_BOOK } from '../api';

export default function Edit({ match, history }) {
  const id = match.params.id;
  const [editBook] = useMutation(EDIT_BOOK);
  const { loading, error, data } = useQuery(GET_SINGLE_BOOK, {
    variables: { id },
  });

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data.book) {
    history.replace('/');
    return null;
  }

  const handleSubmit = book => {
    editBook({
      variables: { ...book },
    });
  };

  const handleReset = e => {
    history.replace('/');
  };

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
