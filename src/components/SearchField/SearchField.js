import React, { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useFetchData from '../../hooks/useFetchData';
import './SearchField.scss';

const SearchList = props => <></>;

const SearchField = () => {
  const [searchText, setSearchText] = useState('');
  const [showList, setShowList] = useState(false);
  const [locations, noResults] = useFetchData(useDebounce(searchText));

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
        onBlur={() => setShowList(false)}
        onFocus={() => setShowList(true)}
      />
      {showList && <SearchList locations={locations} noResults={noResults} />}
    </div>
  );
};

export default SearchField;
