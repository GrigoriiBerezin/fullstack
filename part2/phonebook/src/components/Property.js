import PropertyInput from "./PropertyInput";

const Property = ({name, state}) => {
    const [value, setValue] = state
    const onChangeEvent = (event) => ((setState) => setState(event.target.value))

    return (<div>{name} <PropertyInput value={value} func={e => onChangeEvent(e)(setValue)}/></div>)
}

export default Property
