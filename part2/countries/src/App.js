import {useEffect, useState} from "react"
import SearchBar from "./components/SearchBar"
import countriesService from './services/countries'
import CountryInfo from "./components/CountryInfo"

function App() {
    const searchState = useState('')
    const [search,] = searchState
    const [countryArray, setCountryArray] = useState([])

    useEffect(() => {
        countriesService.getCountries(search)
            .then(data => (setCountryArray(data)))
            .catch(() => setCountryArray([]))
    }, [search])

    return (
        <div>
            <SearchBar searchState={searchState}/>
            <CountryInfo countries={countryArray}/>
        </div>
    )
}

export default App;
