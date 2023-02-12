import {useEffect, useState} from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from './services/persons'

const App = () => {
    const personsState = useState([]);
    const [persons, setPersons] = personsState

    useEffect(() => {
        personsService.getAll().then(data => setPersons(data))
    }, [])

    const defaultInfo = {'name': '', 'number': ''}
    const infoState = useState(defaultInfo);
    const [info, setInfo] = infoState // makes it easier to add more props

    const defaultSearchMask = ''
    const searchMaskState = useState(defaultSearchMask);
    const [searchMask,] = searchMaskState

    const searchedPersons = persons.filter(p => p.name.toLowerCase().includes(searchMask))

    const addPerson = (event) => {
        event.preventDefault()
        const personIndex = persons.findIndex(p => p.name === info.name) + 1;
        if (personIndex !== 0) {
            if (window.confirm(`${info.name} is already added to phonebook, replace the old number with a new one?`)) {
                personsService.update(personIndex, {...info})
                    .then(updatedPerson => setPersons(persons.map(p => updatedPerson.id === p.id ? updatedPerson : p)))
            }
        } else {
            const newPerson = {...info}
            personsService.create(newPerson).then(p => setPersons(persons.concat(p)))
        }
        setInfo(defaultInfo)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchState={searchMaskState}/>
            <h3>Add a new</h3>
            <PersonForm properties={infoState} onSubmit={addPerson}/>
            <h2>Numbers</h2>
            <Persons persons={searchedPersons}/>
        </div>
    )
}

export default App
