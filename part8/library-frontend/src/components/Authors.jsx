import { useState } from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries";

const Authors = ({ show, authors, token, setError }) => {
  const [setBornTo, setSetBornTo] = useState("");
  const [name, setName] = useState("");

  const [editBorn] = useMutation(queries.EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: queries.ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
      setTimeout(() => setError(null), 3000);
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    editBorn({ variables: { name, setBornTo } });
    setSetBornTo("");
    setName("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <form onSubmit={submit}>
        <label>
          Author:
          <select
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          Born:
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type="submit">edit author</button>
      </form>}
    </div>
  );
};

export default Authors;
