import {useEffect, useState} from "react";
import weatherService from "../services/weather";

const CountryInfo = ({country}) => {
    const [weather, setWeather] = useState({temp: null, img: null, wind: null})
    useEffect(() => {
        weatherService.getByCity(country.capital[0])
            .then(data => ({
                temp: data.current.temp_c,
                img: data.current.condition.icon,
                wind: data.current.wind_kph
            }))
            .then(data => setWeather(data))
    }, [])
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: <b>{country.capital[0]}</b></p>
            <p>Area: <b>{country.area}</b></p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(l => <li>{l}</li>)}
            </ul>
            <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature: {weather.temp}</p>
            <img src={weather.img} alt='weather icon'/>
            <p>wind: {weather.wind}</p>
        </div>
    )
}

export default CountryInfo
