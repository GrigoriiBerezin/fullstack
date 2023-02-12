const CountryInfo = ({countries, onShow, weather}) => {
    if (countries.length > 10) {
        return (<div><p>Too many matches, specify another filter</p></div>)
    } else if (countries.length > 1) {
        return (countries.map(c => <p>{c.name.common}<button onClick={() => onShow(c.name.common)}>show</button></p>))
    } else if (countries.length === 1) {
        const country = countries[0]
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
    } else {
        return (<div><p>No country with such name</p></div>)
    }
}

export default CountryInfo
