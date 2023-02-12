import {useEffect, useState} from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from './services/persons'
import Notification from "./components/Notification";

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

    const [infoMessage, setInfoMessage] = useState(null)

    const searchedPersons = persons.filter(p => p.name.toLowerCase().includes(searchMask))

    const removeMessage = (duration) => setTimeout(() => setInfoMessage(null), duration)

    const addPerson = (event) => {
        event.preventDefault()
        const personIndex = persons.findIndex(p => p.name === info.name) + 1;
        if (personIndex !== 0) {
            if (window.confirm(`${info.name} is already added to phonebook, replace the old number with a new one?`)) {
                personsService.update(personIndex, {...info})
                    .then(updatedPerson => setPersons(persons.map(p => updatedPerson.id === p.id ? updatedPerson : p)))
                setInfoMessage(`Updated ${info.name}`)
                removeMessage(5000)
            }
        } else {
            const newPerson = {...info}
            personsService.create(newPerson).then(p => setPersons(persons.concat(p)))
            setInfoMessage(`Added ${info.name}`)
            removeMessage(5000)
        }
        setInfo(defaultInfo)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={infoMessage}/>
            <Filter searchState={searchMaskState}/>
            <h3>Add a new</h3>
            <PersonForm properties={infoState} onSubmit={addPerson}/>
            <h2>Numbers</h2>
            <Persons persons={searchedPersons}/>
        </div>
    )
}

export default App
