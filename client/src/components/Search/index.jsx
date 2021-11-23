export const Search = ({onSubmit}) =>{
  const getInput = () =>{
    const searchInput = document.getElementById("search-input").value;
    onSubmit(searchInput)
  }

  return(
    <div className="search">
      <input className="search__input" 
        id="search-input" 
        type="text" 
        name="search" 
        placeholder="Enter medication name..." />
      <button className="search__button" 
        type="submit" 
        onClick={getInput}>
          Search</button>
    </div>
  )
}