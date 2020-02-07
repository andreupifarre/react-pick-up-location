import React, { useState } from 'react';
import './SearchField.scss';

const SearchField = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="c-search-field">
      <label htmlFor="c-search-input" className="c-search-field__label">
        Pick-up Location
      </label>
      <input
        id="c-search-input"
        type="text"
        className="c-search-field__input"
        autoComplete="off"
        placeholder="city, airport, station, region, district…"
        aria-required="true"
        aria-autocomplete="list"
        aria-haspopup="true"
        onChange={e => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchField;
