import { gql } from 'apollo-boost';

const BookDetails = gql`
  fragment BookDetails on Book {
    bookId
    title
    author
    price
  }
`;

export { BookDetails };
