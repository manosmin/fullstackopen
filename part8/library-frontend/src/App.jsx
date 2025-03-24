import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import queries from "./queries";

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)

  const result_books = useQuery(queries.ALL_BOOKS);
  const result_authors = useQuery(queries.ALL_AUTHORS);

  if (result_books.loading || result_authors.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} authors={result_authors.data.allAuthors} setError={setErrorMessage} />

      <Books show={page === "books"} books={result_books.data.allBooks} />

      <NewBook show={page === "add"} setError={setErrorMessage} />
    </div>
  );
};

export default App;
