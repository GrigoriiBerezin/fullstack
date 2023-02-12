import personsService from '../services/persons'

const Person = ({person}) => {
    const onDelete = () => window.confirm(`Delete ${person.name}?`) ? personsService._delete(person.id) : {}

    // doesn't update persons
    return (
        <div>
            <p>
                {person.name} {person.number}
                <button onClick={onDelete}>delete</button>
            </p>
        </div>
    )
}

export default Person
