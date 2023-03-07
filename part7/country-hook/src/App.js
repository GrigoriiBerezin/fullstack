import React, {useState, useEffect} from 'react'
import countryService from './services/countries'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const handleResponse = (response) => {
    return {
      name: response.name.official,
      capital: response.capital[0],
      population: response.population,
      flag: response.flags.png
    }
  }

  useEffect(() => {
    const inner = async () => {
      console.log(name)
      const data = await countryService.getCountries(name)
      console.log(data)
      data.length >= 1 ?
        setCountry({found: true, data: handleResponse(data[0])}) :
        setCountry({found: false})
    }
    name && inner()
  }, [name])

  return country
}

const Country = ({country}) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country}/>
    </div>
  )
}

export default App
