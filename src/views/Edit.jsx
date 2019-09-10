import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import BookForm from '../components/BookForm';
import ViewWrap from '../components/styled/ViewWrap';
import { GET_SINGLE_BOOK, EDIT_BOOK, GET_BOOKS, GET_TOTAL_PRICE } from '../api';

/**
 * @desc edit book
 * manually update cache data
 */
export default function Edit({ match, history }) {
  const id = match.params.id;
  const { loading, error, data } = useQuery(GET_SINGLE_BOOK, {
    variables: { id },
  });
  const [
    editBook,
    { loading: editLoading, error: editError, data: editData },
  ] = useMutation(EDIT_BOOK, {
    // update books and book cache data
    update: (cache, { data: { editBook } }) => {
      try {
        const { books } = cache.readQuery({ query: GET_BOOKS });
        const newBooks = books.map(b => {
          if (b.bookId === editBook.bookId) {
            b = { ...b, ...editBook };
          }
          return b;
        });
        cache.writeQuery({
          query: GET_BOOKS,
          data: { books: newBooks },
        });
        cache.writeQuery({
          query: GET_SINGLE_BOOK,
          variables: { id },
          data: { book: editBook },
        });
      } catch (err) {
        console.error('books not fetched');
      }
    },
    refetchQueries: [{ query: GET_TOTAL_PRICE }],
  });

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
   * @param {Object} e
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
