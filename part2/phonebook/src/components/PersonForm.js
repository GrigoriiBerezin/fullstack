import Property from "./Property";

const PersonForm = ({properties, onSubmit}) => {
    return (<form onSubmit={onSubmit}>
        {properties.map(prop => <Property key={prop.id} name={prop.name} state={prop.state}/>)}
        <div>
            <button type="submit">add</button>
        </div>
    </form>)
}

export default PersonForm
