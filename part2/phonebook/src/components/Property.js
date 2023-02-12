import PropertyInput from "./PropertyInput";

const Property = ({name, value, func}) => (<div>{name} <PropertyInput value={value} func={func}/></div>)

export default Property
