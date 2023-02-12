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

    const defaultInfoMessage = {type: 'notification', msg: null}
    const [infoMessage, setInfoMessage] = useState(defaultInfoMessage)

    const searchedPersons = persons.filter(p => p.name.toLowerCase().includes(searchMask))

    const removeMessage = (duration) => setTimeout(() => setInfoMessage(defaultInfoMessage), duration)

    const addPerson = (event) => {
        event.preventDefault()
        const personIndex = persons.findIndex(p => p.name === info.name) + 1;
        if (personIndex !== 0) {
            if (window.confirm(`${info.name} is already added to phonebook, replace the old number with a new one?`)) {
                personsService.update(personIndex, {...info})
                    .then(updatedPerson => setPersons(persons.map(p => updatedPerson.id === p.id ? updatedPerson : p)))
                setInfoMessage({type: 'notification', msg: `Updated ${info.name}`})
                removeMessage(5000)
            }
        } else {
            const newPerson = {...info}
            personsService.create(newPerson).then(p => setPersons(persons.concat(p)))
            setInfoMessage({type: 'notification', msg: `Added ${info.name}`})
            removeMessage(5000)
        }
        setInfo(defaultInfo)
    }

    const onDelete = (person) => window.confirm(`Delete ${person.name}?`) ?
        personsService._delete(person.id)
            .then(() => personsService.getAll().then(data => {
                console.log(data)
                setPersons(data)
            }))
            .catch(() => {
            setInfoMessage({
                type: 'error',
                msg: `Information of ${person.name} has already been removed from the server`
            })
            removeMessage(5000)
            setPersons(persons.filter(p => p.id !== person.id))
        }) : null

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification messageInfo={infoMessage}/>
            <Filter searchState={searchMaskState}/>
            <h3>Add a new</h3>
            <PersonForm properties={infoState} onSubmit={addPerson}/>
            <h2>Numbers</h2>
            <Persons persons={searchedPersons} onDelete={onDelete}/>
        </div>
    )
}

export default App
