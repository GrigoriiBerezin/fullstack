import CountryInfo from "./CountryInfo";

const CountriesList = ({countries, onShow}) => {
    if (countries.length > 10) {
        return (<div><p>Too many matches, specify another filter</p></div>)
    } else if (countries.length > 1) {
        return (countries.map(c => <p>{c.name.common}
            <button onClick={() => onShow(c.name.common)}>show</button>
        </p>))
    } else if (countries.length === 1) {
        return (<CountryInfo country={countries[0]}/>)
    } else {
        return (<div><p>No country with such name</p></div>)
    }
}

export default CountriesList
