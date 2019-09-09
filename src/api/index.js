import { gql } from 'apollo-boost';
import { BookDetails } from './fragments';

const GET_BOOKS = gql`
  query Books {
    books {
      ...BookDetails
    }
  }

  ${BookDetails}
`;

const GET_SINGLE_BOOK = gql`
  query Book($id: Int!) {
    book(bookId: $id) {
      ...BookDetails
    }
  }

  ${BookDetails}
`;

const EDIT_BOOK = gql`
  mutation EditBook(
    $id: Int!
    $title: String!
    $author: String!
    $price: Float!
  ) {
    editBook(bookId: $id, title: $title, author: $author, price: $price) {
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

export { GET_BOOKS, GET_SINGLE_BOOK, EDIT_BOOK, CREATE_BOOK };
