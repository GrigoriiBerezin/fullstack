import {useEffect, useState} from "react"
import SearchBar from "./components/SearchBar"
import countriesService from './services/countries'
import CountryInfo from "./components/CountryInfo"
import weatherService from "./services/weather";

function App() {
    const searchState = useState('')
    const [search, setSearch] = searchState
    const [countryArray, setCountryArray] = useState([])
    const [weather, setWeather] = useState({temp: null, img: null, wind: null})

    useEffect(() => {
        countriesService.getCountries(search)
            .then(data => (setCountryArray(data)))
            .catch(() => setCountryArray([]))
    }, [search])

    useEffect(() => {
        if (countryArray.length === 1) {
            const country = countryArray[0]
            weatherService.getByCity(country.capital[0])
                .then(data => ({
                    temp: data.current.temp_c,
                    img: data.current.condition.icon,
                    wind: data.current.wind_kph
                }))
                .then(data => setWeather(data))
        }
    }, [countryArray])

    const onShow = (name) => (setSearch(name))

    return (
        <div>
            <SearchBar searchState={searchState}/>
            <CountryInfo countries={countryArray} onShow={onShow} weather={weather}/>
        </div>
    )
}

export default App;
