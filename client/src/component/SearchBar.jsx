function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search company or position..."
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
    />
  );
}

export default SearchBar;