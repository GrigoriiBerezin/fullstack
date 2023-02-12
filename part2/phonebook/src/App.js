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

    const defaultInfo = {'name': '', 'number': ''}
    const infoState = useState(defaultInfo);
    const [info, setInfo] = infoState // makes it easier to add more props

    const defaultSearchMask = ''
    const searchMaskState = useState(defaultSearchMask);
    const [searchMask,] = searchMaskState

    const searchedPersons = persons.filter(p => p.name.toLowerCase().includes(searchMask))

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(p => p.name === info.name)) {
            alert(`${info.name} is already added to phonebook`)
        } else {
            const newPersons = persons.concat({...info, id: persons.length + 1});
            setPersons(newPersons)
            setInfo(defaultInfo)
        }
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
