import {useEffect, useState} from "react"
import SearchBar from "./components/SearchBar"
import countriesService from './services/countries'
import CountriesList from "./components/CountriesList"

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
            <CountriesList countries={countryArray} onShow={onShow}/>
        </div>
    )
}

export default App;
