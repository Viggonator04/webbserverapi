import './App.css';
import React, { useState, useEffect } from 'react';

function Search(props) {
  const [cityInput, setCityInput] = useState(props.city);

  function handleCityInputChange(event) {
    setCityInput(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    props.setCity(cityInput);
  }

  return (
    <>
      <div>
        <form id="form" className="searchform" onSubmit={handleSearch}>
          <input
            value={cityInput}
            onChange={handleCityInputChange}
            id="cityinput"
            type="text"
            className="searchfield"
            placeholder='search'
            autoComplete='off'
          />
        </form>
      </div>
    </>
  );
}

function Weather(props) {
  const [data, setData] = useState(null)

  function weatherBalloon(cityname) {
    var key = 'dbfe75881e1532ffcb60cc12bde996ab';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&appid=' + key)
      .then(function (resp) { return resp.json() }) // Convert data to json
      .then(function (data) {
        setData(data)
        //drawWeather(data); // Call drawWeather
        console.log(data)
      })
      .catch(function () {
        // catch any errors
      });
  }

  useEffect(() => {
    if (props.city) {
      weatherBalloon(props.city);
    }
  }, [props.city]);

  return (
    <div className="weather" id="weather">
      {data && data.cod === "400" ? (
        <h1>Error</h1>
      ) : (
        <>
          <div className="description" id="description">
            {data && data.weather && data.weather[0].description}
          </div>
          <h1 className="temperature" id="temp">
            {data && Math.round(parseFloat(data.main.temp) - 273.15)}
          </h1>
          <div className="location" id="location">
            {data && data.name}
          </div>
        </>
      )}
    </div>
  )
}

function App() {
  const [city, setCity] = useState("");
  const [savedCities, setSavedCities] = useState([]);

  function handleSave(data) {
    setSavedCities([...savedCities, data]);
  }

  return (
    <>
      <Search setCity={setCity} />
      <Weather city={city} onSave={handleSave} />
    </>
  )
}

export default App;
