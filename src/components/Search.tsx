import React from "react";

interface Props {
  values: { name: string; tag: string };
  onSearchInputsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FunctionComponent<Props> = ({
  values,
  onSearchInputsChange,
}) => {
  return (
    <div className="search">
      <input
        id="name-input"
        name="name"
        type="text"
        value={values.name}
        onChange={onSearchInputsChange}
        placeholder="Seach by name"
      />
      <input
        id="tag-input"
        name="tag"
        type="text"
        value={values.tag}
        onChange={onSearchInputsChange}
        placeholder="Seach by tag"
      />
    </div>
  );
};

export default Search;
