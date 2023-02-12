import {useEffect, useState} from "react"
import SearchBar from "./components/SearchBar"
import countriesService from './services/countries'
import CountryInfo from "./components/CountryInfo"

function App() {
    const searchState = useState('')
    const [search, setSearch] = searchState
    const [countryArray, setCountryArray] = useState([])

    useEffect(() => {
        countriesService.getCountries(search)
            .then(data => (setCountryArray(data)))
            .catch(() => setCountryArray([]))
    }, [search])

    const onShow = (name) => (setSearch(name))

    return (
        <div>
            <SearchBar searchState={searchState}/>
            <CountryInfo countries={countryArray} onShow={onShow}/>
        </div>
    )
}

export default App;
