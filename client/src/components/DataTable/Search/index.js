import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onInputChange = (value) => {
    // setLoading(true);
    setSearch(value);
    onSearch(value);
  };
  return (
    <>
      {/* {!isLoading && ( */}
      <input
        type="text"
        className="form-control"
        style={{ width: "240px" }}
        placeholder="Search"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
      {/* )} */}
      {/* {isLoading && (
        <button className="form__btn" disabled>
          <i className="fas fa-spinner fa-spin"></i>
        </button>
      )} */}
    </>
  );
};

export default Search;
