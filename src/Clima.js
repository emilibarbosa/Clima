import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const apiKey = 'e731178f0a3c96ed995df9b2a5365ceb'; //chave

    const getWeather = async (cityName) => {
        if (!cityName) return;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            setWeatherData(response.data);
            setError('');
        } catch (err) {
            setError('Cidade não encontrada. Tente novamente.');
            setWeatherData(null);
        }
    };

    const capitalizeWords = (str) => {
        return str
            .toLowerCase() // Converte toda a string para minúscula
            .split(' ') // Divide em palavras
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza a primeira letra
            .join(' '); // Junta de volta em uma string
    };

    return (
        <div className="container">
            <h1>Clima</h1>
            <input
                type="text"
                placeholder="Digite a cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={() => getWeather(city)}>Buscar</button>
            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <h2>
                        {capitalizeWords(weatherData.name)}
                        {weatherData.sys.state ? `, ${capitalizeWords(weatherData.sys.state)}` : ''}
                        {`, ${weatherData.sys.country}`}
                    </h2>
                    <p>Temperatura: {weatherData.main.temp} °C</p>
                    <p>Máxima: {weatherData.main.temp_max} °C</p>
                    <p>Mínima: {weatherData.main.temp_min} °C</p>
                    <p>Condições: {capitalizeWords(weatherData.weather[0].description)}</p>
                    <p>Probabilidade de chuva: {weatherData.rain ? `${weatherData.rain['1h'] || 0}%` : '0%'}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
