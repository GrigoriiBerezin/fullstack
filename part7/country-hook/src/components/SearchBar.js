const SearchBar = ({searchState}) => {
    const [search, setSearch] = searchState
    return (
        <div>
            find countries<input value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
    )
}

export default SearchBar
