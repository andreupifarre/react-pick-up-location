import { useState, useEffect } from 'react';

const useFetchData = term => {
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(true);

  useEffect(() => {
    if (term) {
      const fetchData = async () => {
        const url = `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${term}`;
        const response = await fetch(url);
        const data = await response.json();
        const isNoFound = data.results.numFound === 0;
        setNoResults(isNoFound);
        setResults(isNoFound ? [] : data.results.docs);
      };

      fetchData();
    } else {
      setResults([]);
      setNoResults(false);
    }
  }, [term]);

  return [results, noResults];
};

export default useFetchData;
