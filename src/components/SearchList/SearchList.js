import React from 'react';
import PropTypes from 'prop-types';
import './SearchList.scss';

const SearchList = ({ locations, noResults }) => (
  <div className="c-search-list">
    <ol className="c-search-list__list" role="listbox">
      {noResults && (
        <span className="c-search-list__nores" aria-live="assertive">
          No results found
        </span>
      )}
      {locations.map(loc => (
        <li
          key={loc.index}
          className="c-search-list__item"
          role="option"
          aria-selected="false"
          tabIndex="-1"
        >
          <div className="c-search-list__location-name">
            {loc.name} {loc.iata && `(${loc.iata})`}
          </div>
          <div className="c-search-list__support-text">
            {loc.city && loc.city + ', '}
            {!loc.city && loc.region && loc.region + ', '}
            {loc.country}
          </div>
        </li>
      ))}
    </ol>
    {locations.length > 0 && (
      <span className="c-search-list__reader-inst" aria-live="assertive">
        {locations.length} results are available.
      </span>
    )}
  </div>
);

SearchList.defaultProps = {
  locations: [],
  noResults: false,
};

SearchList.propTypes = {
  locations: PropTypes.array.isRequired,
  noResults: PropTypes.bool.isRequired,
};

export default SearchList;
