import PropertyInput from "./PropertyInput";

const Filter = ({searchList, searchState, resultState}) => {
    const [searchMask, setSearchMask] = searchState
    const [, setResult] = resultState

    const searchByMask = (event) => {
        const mask = event.target.value.toLowerCase();
        setSearchMask(mask)
        setResult(searchList.filter(p => p.name.toLowerCase().includes(mask)))
    }

    return (
        <div>
            {'filter shown with:'} <PropertyInput value={searchMask} func={searchByMask}/>
        </div>
    )
}

export default Filter
