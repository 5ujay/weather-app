import React, { useState } from "react";
import "./WeatherApp.css";
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import loadingGif from "../assets/images/loading.gif";

const WeatherApp = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "f83e1ee08f2b08d2a3e3abe076ba591b";

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
      const res = await fetch(url);
      const searchData = await res.json();

      if (searchData.cod === 200) {
        setData(searchData);
        setLocation("");
      } else {
        setData({ notFound: true });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const backgroundImages = {
    Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
    Clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
    Mist: "linear-gradient(to right, #57d6d4, #71eeec)",
  };

  const backgroundImage =
    data && data.weather
      ? backgroundImages[data.weather[0].main]
      : "linear-gradient(to right, #f3b07c, #fcd283)";

  const currentDate = new Date();

  const daysofWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayofWeek = daysofWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayofMonth = currentDate.getDate();

  const formattedDate = `${dayofWeek}, ${dayofMonth} ${month}`;

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(e);
    }
  };

  return (
    <div className="container" style={{ backgroundImage }}>
      <div className="weather-app" style={{ backgroundImage }}>
        <h1 className="heading">Weather forecasting webapp ⛅</h1>
        <form className="search" onSubmit={search}>
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data ? data.name : "City"}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>

        {loading ? (
          <img className="loader" src={loadingGif} alt="loading" />
        ) : data && !data.notFound ? (
          <>
            <div className="weather">
              <img src={weatherImages[data.weather[0].main]} alt="Weather" />
              <div className="weather-type">{data.weather[0].main}</div>
              <div className="temp">
                {`${Math.floor(data.main.temp - 273.15)}°C`}
              </div>
            </div>
            <div className="weather-date">
              <p>{formattedDate}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">{`${data.main.humidity}%`}</div>
              </div>
              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">{`${data.wind.speed} km/h`}</div>
              </div>
            </div>
          </>
        ) : (
          <div className="not-found">City not found 🚫😔</div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
