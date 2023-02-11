import {useState} from 'react'
import Person from "./components/Person";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])

    const [searchedPersons, setSearchedPersons] = useState(persons)

    const defaultName = ''
    const [newName, setNewName] = useState(defaultName)

    const defaultNumber = ''
    const [number, setNumber] = useState(defaultNumber)

    const defaultSearchMask = ''
    const [searchMask, setSearchMask] = useState(defaultSearchMask)

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat({id: persons.length + 1, name: newName, number: number}))
            setNewName(defaultName)
            setNumber(defaultNumber)
        }
    }

    const onChangeEvent = (event) => ((setState) => setState(event.target.value))
    const searchByMask = (event) => {
        const mask = event.target.value.toLowerCase();
        setSearchMask(mask)
        setSearchedPersons(persons.filter(p => p.name.toLowerCase().includes(mask)))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    filter shown with: <input value={searchMask} onChange={searchByMask}/>
                </div>
                <div>
                    name: <input value={newName} onChange={e => onChangeEvent(e)(setNewName)}/>
                </div>
                <div>
                    number: <input value={number} onChange={e => onChangeEvent(e)(setNumber)}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {searchedPersons.map(person => <Person key={person.id} name={person.name} number={person.number}/>)}
            </div>
        </div>
    )
}

export default App
