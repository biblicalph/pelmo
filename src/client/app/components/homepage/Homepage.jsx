import 'App/components/homepage/homepage.css';
import { cityWeatherUrl, useSetPageTitle } from 'App/utils';
import montrealImg from 'Assets/img/montreal.jpg';
import torontoImg from 'Assets/img/toronto.jpg';
import React from 'react';
import { Link } from 'react-router-dom';

export const CityCard = ({ cityName, imgUrl }) => {
  return (
    <div className="home-city-card">
      <Link to={cityWeatherUrl(cityName)}>
        <img className="home-city-card-img" src={imgUrl} alt={cityName} />
        <div className="home-city-card-footer">
          <h4>{cityName}</h4>
        </div>
      </Link>
    </div>
  );
};

const HomePage = () => {
  useSetPageTitle('Homepage - browse weather in your city');
  
  return (
    <section className="home-container">
      <h2>Browse Weather by City</h2>
      <div className="home-card-wrapper">
        <CityCard cityName='Toronto' imgUrl={torontoImg} />
        <CityCard cityName='Montreal' imgUrl={montrealImg} />
      </div>
    </section>
  );
};

export default HomePage;