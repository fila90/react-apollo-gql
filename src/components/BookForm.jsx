import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-flow: column;
  padding: 1rem;
`;
const FormLabel = styled.label`
  display: flex;
  flex-flow: column;
  margin-bottom: 1rem;
`;

export default function BookForm({ onSubmit, onReset, book, shouldReset }) {
  const [title, setTitle] = useState(book ? book.title : '');
  const [author, setAuthor] = useState(book ? book.author : '');
  const [price, setPrice] = useState(book ? book.price : 0.0);

  /**
   * @desc when new book is added, shouldReset will trigger a change
   * reset all options to starting values
   */
  useEffect(() => {
    if (shouldReset) {
      setTitle('');
      setAuthor('');
      setPrice(0.0);
    }
  }, [shouldReset]);

  /**
   * @desc prevent page reload and pass book object to parent function
   */
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      title,
      author,
      price,
      bookId: book ? book.bookId : null,
    });
  };

  return (
    <Form onSubmit={handleSubmit} onReset={onReset}>
      <FormLabel>
        Title
        <input
          type='text'
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </FormLabel>
      <FormLabel>
        Author
        <input
          type='text'
          name='author'
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
      </FormLabel>
      <FormLabel>
        Price
        <input
          type='number'
          step='0.01'
          name='price'
          value={price}
          onChange={e => setPrice(parseFloat(e.target.value))}
          required
        />
      </FormLabel>

      <div>
        <button type='submit'>{book ? 'Edit' : 'Create'}</button>
        <button type='reset'>Cancel</button>
      </div>
    </Form>
  );
}
