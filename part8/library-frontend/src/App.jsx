import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import FavoriteGenres from "./components/FavoriteGenres";
import { useQuery, useSubscription } from "@apollo/client";
import queries from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const result_user = useQuery(queries.USER_INFO);
  const result_books = useQuery(queries.ALL_BOOKS);
  const result_authors = useQuery(queries.ALL_AUTHORS);

  useSubscription(queries.BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data);
      const addedBookTitle = data.data.bookAdded.title;
      window.alert(`A new book was added: ${addedBookTitle}`);
    },
  });

  if (result_user.loading || result_books.loading || result_authors.loading) {
    return <div>loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={handleLogout}>logout</button>
        )}
        {token && (
          <button onClick={() => setPage("favorite")}>favorite genres</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === "authors"}
        authors={result_authors.data.allAuthors}
        setError={setErrorMessage}
        token={token}
      />

      <Books show={page === "books"} books={result_books.data.allBooks} />

      <NewBook show={page === "add"} setError={setErrorMessage} token={token} />

      <Login
        show={page === "login"}
        setError={setErrorMessage}
        setToken={setToken}
      />

      <FavoriteGenres show={page === "favorite"} genre={result_user.data.me} />
    </div>
  );
};

export default App;
