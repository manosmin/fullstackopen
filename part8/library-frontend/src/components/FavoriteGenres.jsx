import { useQuery } from "@apollo/client";
import queries from "../queries";
import { useEffect } from "react";

const FavoriteGenres = ({ show, me }) => {
  const result = useQuery(queries.ALL_BOOKS_BY_GENRE, {
    variables: { genre: me?.favoriteGenre },
  });

  useEffect(() => {
    result.refetch();
  }, [])

  if (!show) {
    return null;
  }

  if (result.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>recommendations</h2>
      {me && (
        <div>
          books in your favorite genre <b>{me?.favoriteGenre}</b>
        </div>
      )}
      {result.data.allBooks && result.data.allBooks.length > 0 && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {result.data.allBooks.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FavoriteGenres;
