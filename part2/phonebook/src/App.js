import {useState} from 'react'
import Person from "./components/Person";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-1234567'}
    ])

    const defaultName = ''
    const [newName, setNewName] = useState(defaultName)

    const defaultNumber = ''
    const [number, setNumber] = useState(defaultNumber)

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat({name: newName, number: number}))
            setNewName(defaultName)
            setNumber(defaultNumber)
        }
    }

    const onChangeEvent = (event) => ((setState) => setState(event.target.value))

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
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
                {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
            </div>
        </div>
    )
}

export default App
