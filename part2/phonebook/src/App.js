import {useState} from 'react'
import Person from "./components/Person";

const App = () => {
    const defaultName = ''

    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState(defaultName)

    const addName = (event) => {
        event.preventDefault()
        setPersons(persons.concat({name: newName}))
        setNewName(defaultName)
    }

    const onChangeEvent = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={onChangeEvent}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(person => <Person key={person.name} name={person.name}/>)}
            </div>
        </div>
    )
}

export default App
