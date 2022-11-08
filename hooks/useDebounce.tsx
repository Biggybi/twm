import {Dispatch, SetStateAction, useEffect, useState} from 'react';

// return a value after a delay, which resets at each call
// works well with `useFetch`
export default function useDebounce<T>(
  value: T,
  delay: number,
): [T, Dispatch<SetStateAction<T>>] {
  const [debouncedValue, setDebouncedValue] = useState(value);

  console.log('-> useDebounce');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, setDebouncedValue];
}
