import PropertyInput from "./PropertyInput";

const Filter = ({searchState}) => {
    const [searchMask, setSearchMask] = searchState

    const searchByMask = (event) => {
        const mask = event.target.value.toLowerCase();
        setSearchMask(mask)
    }

    return (
        <div>
            {'filter shown with:'} <PropertyInput value={searchMask} func={searchByMask}/>
        </div>
    )
}

export default Filter
