import React, { useState } from 'react';
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

export default function BookForm({ onSubmit, onReset, book }) {
  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [price, setPrice] = useState(book.price || 0.0);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      title,
      author,
      price,
      bookId: book.bookId || null,
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
