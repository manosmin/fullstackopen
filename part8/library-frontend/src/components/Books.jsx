import { useState } from "react";

const Books = ({ show, books }) => {
  const [filteredBooks, setFilteredBooks] = useState(books);

  if (!show) {
    return null;
  }

  const genres = books
    .filter((b) => b.genres)
    .flatMap((b) => b.genres)
    .reduce((uniqueGenres, genre) => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre);
      }
      return uniqueGenres;
    }, []);

  const handleClick = (genre) => {
    return () => {
      const filtered = books.filter((b) => b.genres?.includes(genre));
      setFilteredBooks(filtered);
    };
  };

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
        <button onClick={handleClick(g)} key={g}>
          {g}
        </button>
      ))}
      <button onClick={() => setFilteredBooks(books)}>all genres</button>
    </div>
  );
};

export default Books;
