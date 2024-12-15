import { useState } from "react";

const Person = ({ name, number }) => {
  return <li>{name} {number}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleChange = (event) => {
    event.target.name === "name"
      ? setNewName(event.target.value)
      : setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };
    const existsPerson = persons.some((p) => personObject.name === p.name);
    existsPerson
      ? console.log(`${personObject.name} is already added to phonebook`)
      : setPersons(persons.concat(personObject));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name="name" value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input name="number" value={newNumber} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p) => (
          <Person key={p.name} name={p.name} number={p.number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
