import { useState, useEffect } from 'react';

const useDebounce = inputText => {
  const [value, setValue] = useState(inputText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(inputText);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [inputText]);

  return value && value.length > 1 ? value : '';
};

export default useDebounce;
