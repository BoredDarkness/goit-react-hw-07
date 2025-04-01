import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import s from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={s.form}>
      <p>Find contact by name:</p>
      <input type="text" value={filter} onChange={handleChange} />
    </div>
  );
};

export default SearchBox;
