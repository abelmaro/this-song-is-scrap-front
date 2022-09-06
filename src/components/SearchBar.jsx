import React from "react";
import "../styles/search-bar.css";
const SearchBar = (props) => {
    return (
        <input
            className="search-bar"
            id={props.id}
            variant="outlined"
            fullWidth
            placeholder={props.label}
            sx={{ input: { color: "#fffff1" } }}
            onChange={(t) => props.setter(t.target.value)}
        />
    );
};

export default SearchBar;
