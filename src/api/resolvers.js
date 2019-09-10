import { gql } from 'apollo-boost';
import { GET_SELECTED_BOOKS, GET_BOOKS } from './index';

export const typeDefs = gql`
  extend type Book {
    isSelected: Boolean!
  }

  extend type Query {
    selectedBooks: [Int]!
  }

  extend type Mutation {
    ToggleBook(bookId: Int!): Int!
  }
`;

export const resolvers = {
  Query: {
    // calculate totalPrice from books
    // when book gets updated, totalPrice gets updated
    totalPrice: (_, __, { cache }) => {
      try {
        const { books } = cache.readQuery({ query: GET_BOOKS });
        return books
          .filter(b => b.isSelected)
          .reduce((pre, cur) => (pre += cur.price), 0)
          .toFixed(2);
      } catch (err) {
        console.error('books not fetched');
        return '0.00';
      }
    },
  },
  Book: {
    // if bookId is in selectedBooks array, return true
    isSelected: (book, _, { cache }) => {
      const { selectedBooks } = cache.readQuery({ query: GET_SELECTED_BOOKS });
      return selectedBooks.some(id => id === book.bookId);
    },
  },
  Mutation: {
    // add/remove bookId from selectedBooks array
    toggleBook: (_, { bookId }, { cache }) => {
      const { selectedBooks } = cache.readQuery({ query: GET_SELECTED_BOOKS });

      const data = {
        selectedBooks: selectedBooks.includes(bookId)
          ? selectedBooks.filter(id => id !== bookId)
          : [...selectedBooks, bookId],
      };

      cache.writeQuery({
        query: GET_SELECTED_BOOKS,
        data,
      });

      return bookId;
    },
  },
};
