"use client";

import { ChangeEvent, useState } from "react";
import css from "./SearchBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBoxProps {
  onChange: (value: string) => void;
}

const SearchBox = ({ onChange }: SearchBoxProps) => {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={css.searchBox}>
      <input
        type="text"
        placeholder="Search notes"
        value={value}
        onChange={handleChange}
        className={css.input}
      />
      <FontAwesomeIcon icon={faSearch} className={css.icon} />
    </div>
  );
};

export default SearchBox;