import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import BookForm from '../components/BookForm';
import ViewWrap from '../components/styled/ViewWrap';
import { GET_SINGLE_BOOK, EDIT_BOOK, GET_BOOKS } from '../api';

export default function Edit({ match, history }) {
  const id = match.params.id;
  const { loading, error, data } = useQuery(GET_SINGLE_BOOK, {
    variables: { id },
  });
  const [
    editBook,
    { loading: editLoading, error: editError, data: editData },
  ] = useMutation(EDIT_BOOK, { refetchQueries: [{ query: GET_BOOKS }] });

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data.book) {
    history.replace('/');
    return null;
  }

  /**
   * @desc pass varaibles to edtiBook mutation
   * @param {Object} book
   */
  const handleSubmit = book => {
    editBook({
      variables: { ...book },
    });
  };

  /**
   * @desc return to List view
   */
  const handleReset = e => {
    history.replace('/');
  };

  return (
    <ViewWrap>
      <h3>Edit book</h3>
      <BookForm
        book={data.book}
        onReset={handleReset}
        onSubmit={handleSubmit}
      />

      {editLoading && <p>editing..</p>}
      {editError && <p>error editing book, try again :(</p>}
      {editData && editData.editBook && <p>book edited!!</p>}
    </ViewWrap>
  );
}
