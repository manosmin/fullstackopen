import { useState } from "react";

const Person = ({ name, number }) => {
  return <li>{name} {number}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setNewName(value);
    } else if (name === "number") {
      setNewNumber(value);
    } else if (name === "filter") {
      setFilter(value);
    }
  };

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

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
      filter shown with <input name="filter" value={filter} onChange={handleChange}/>
      <form onSubmit={handleSubmit}>
        <h2>add a new</h2>
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
        {filteredPersons.map((p) => (
          <Person key={p.name} name={p.name} number={p.number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
