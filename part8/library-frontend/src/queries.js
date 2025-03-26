import { gql } from "@apollo/client";

const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`;

const ALL_BOOKS_BY_GENRE = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const EDIT_AUTHOR_BORN = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      born
      name
    }
  }
`;

const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const USER_INFO = gql`
  query {
    me {
      favoriteGenre
      username
    }
  }
`;

export default {
  CREATE_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
  EDIT_AUTHOR_BORN,
  LOGIN,
  USER_INFO,
  ALL_BOOKS_BY_GENRE,
};
