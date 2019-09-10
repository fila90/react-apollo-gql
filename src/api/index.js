import { gql } from 'apollo-boost';
import { BookDetails } from './fragments';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      ...BookDetails
      isSelected @client
    }
  }

  ${BookDetails}
`;

const GET_SINGLE_BOOK = gql`
  query GetBook($id: Int!) {
    book(bookId: $id) {
      ...BookDetails
    }
  }

  ${BookDetails}
`;

const EDIT_BOOK = gql`
  mutation EditBook(
    $bookId: Int!
    $title: String!
    $author: String!
    $price: Float!
  ) {
    editBook(bookId: $bookId, title: $title, author: $author, price: $price) {
      ...BookDetails
    }
  }

  ${BookDetails}
`;

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $price: Float!) {
    createBook(title: $title, author: $author, price: $price) {
      ...BookDetails
    }
  }

  ${BookDetails}
`;

// CLIENT
const GET_SELECTED_BOOKS = gql`
  query GetSelectedBooks {
    selectedBooks @client
  }
`;

const GET_TOTAL_PRICE = gql`
  query GetTotalPrice {
    totalPrice @client
  }
`;

const TOGGLE_BOOK = gql`
  mutation ToggleBook($bookId: Int!) {
    toggleBook(bookId: $bookId) @client
  }

  ${BookDetails}
`;

export {
  GET_BOOKS,
  GET_SINGLE_BOOK,
  EDIT_BOOK,
  CREATE_BOOK,
  GET_SELECTED_BOOKS,
  GET_TOTAL_PRICE,
  TOGGLE_BOOK,
};
