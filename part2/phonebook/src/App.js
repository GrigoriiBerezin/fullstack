import {useState} from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
    const personsState = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ]);
    const [persons, setPersons] = personsState

    const searchedPersonsState = useState(persons);
    const [searchedPersons, setSearchedPersons] = searchedPersonsState

    const defaultName = ''
    const newNameState = useState(defaultName);
    const [newName, setNewName] = newNameState

    const defaultNumber = ''
    const numberState = useState(defaultNumber);
    const [number, setNumber] = numberState

    const defaultSearchMask = ''
    const searchMaskState = useState(defaultSearchMask);
    const [, setSearchMask] = searchMaskState

    const formProperties = [
        {id: 1, name: 'name', state: newNameState},
        {id: 2, name: 'number', state: numberState}
    ]

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const newPersons = persons.concat({id: persons.length + 1, name: newName, number: number});
            setPersons(newPersons)
            setSearchedPersons(newPersons)
            setSearchMask(defaultSearchMask)
            setNewName(defaultName)
            setNumber(defaultNumber)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchList={persons} searchState={searchMaskState} resultState={searchedPersonsState}/>
            <h3>Add a new</h3>
            <PersonForm properties={formProperties} onSubmit={addPerson}/>
            <h2>Numbers</h2>
            <Persons persons={searchedPersons}/>
        </div>
    )
}

export default App
