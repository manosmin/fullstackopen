import { useEffect, useState } from "react";
import axios from "axios";

const SearchField = ({ query, handleChange }) => {
  return (
    <>
      <h2>Find countries </h2>
      <input value={query} onChange={handleChange}></input>
    </>
  );
};

const Results = ({ countries, message, selectedCountry, handleShowInfo }) => {
  if (countries.length === 0) {
    return <p>{message}</p>;
  } 
  else if (countries.length === 1 || selectedCountry) {
    const country = selectedCountry || countries[0];
    const languages = Object.values(country.lang);

    return (
      <div>
        <h2>{country.name}</h2>
        <img src={country.flag} />
        <p><span style={{fontWeight: "bold"}}>Capital: </span>{country.capital}</p>
        <p><span style={{fontWeight: "bold"}}>Area: </span>{country.area}</p>
        <h3>Languages: </h3>
        <ul>
          {languages.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
      </div>
    );
  } 
  else {
    return (
      <ul>
        {countries.map((c) => (
          <li key={c.name}>
            {c.name}
            <button onClick={() => handleShowInfo(c)}>Show Info</button>
          </li>
        ))}
      </ul>
    );
  }
};

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowInfo = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        const parsedCountries = response.data.map((c) => ({
          name: c.name.common,
          capital: c.capital,
          area: c.area,
          lang: c.languages,
          flag: c.flags.png,
        }));
        setCountries(parsedCountries);
        console.log(parsedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const searchCountries = () => {
      handleShowInfo(null);
      if (query.trim() === "") {
        setResults([]);
        setMessage("");
        return;
      }

      const filteredCountries = countries.filter((c) => {
        return c.name.toLowerCase().includes(query.toLowerCase());
      });

      console.log(filteredCountries);

      if (filteredCountries.length > 10) {
        setMessage("Too many results, insert more letters");
        setResults([]);
      } else {
        setMessage("");
        setResults(filteredCountries);
      }
    };

    searchCountries();
  }, [query, countries]);

  return (
    <div>
      <SearchField query={query} handleChange={handleChange} />
      <Results countries={results} message={message} selectedCountry={selectedCountry} handleShowInfo={handleShowInfo}/>
    </div>
  );
};

export default App;
