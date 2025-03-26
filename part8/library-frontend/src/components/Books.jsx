import { useState } from "react";
import { useQuery } from "@apollo/client";
import queries from "../queries";

const Books = ({ show, books }) => {
  const [selectedGenre, setSelectedGenre] = useState("");

  const result = useQuery(queries.ALL_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
  });

  if (!show) {
    return null;
  }

  if (result.loading) return <div>loading...</div>;

  const genres = books
    .filter((b) => b.genres)
    .flatMap((b) => b.genres)
    .reduce((uniqueGenres, genre) => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre);
      }
      return uniqueGenres;
    }, []);

  const filteredBooks = selectedGenre ? result.data.allBooks : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button onClick={() => setSelectedGenre(g)} key={g}>
          {g}
        </button>
      ))}
      <button onClick={() => setSelectedGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
