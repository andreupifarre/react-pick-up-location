import React from 'react';
import SearchField from '../SearchField/SearchField';
import './SearchBox.scss';

const SearchBox = () => (
  <div className="c-search-box">
    <h2 className="c-search-box__title">Let’s find your ideal car</h2>
    <SearchField />
  </div>
);

export default SearchBox;
