import Property from "./Property";

const PersonForm = ({properties, onSubmit}) => {
    const [info, setInfo] = properties
    // I hope there is a better way to perform this
    return (<form onSubmit={onSubmit}>
        {Object.keys(info)
            .map((key, i) => {
                const newObj = {...info}
                const func = (event) => {
                    newObj[key] = event.target.value
                    setInfo(newObj)
                }
                return <Property key={i} name={key} value={info[key]} func={func}/>
            })}
        <div>
            <button type="submit">add</button>
        </div>
    </form>)
}

export default PersonForm
