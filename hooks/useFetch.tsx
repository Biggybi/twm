import {useEffect, useReducer, useRef} from 'react';

function get_url(urlparts: string[]) {
  var base_url = 'http://192.168.0.30:8090/twm/web';
  // var base_url = "http://192.168.1.197:8090/twm/web";
  urlparts.unshift(base_url);
  var url = urlparts.join('/');
  return url;
}

interface State<T> {
  data: T | undefined;
  error: Error | undefined;
  state: string;
}

type Cache<T> = {[url: string]: T};

// discriminated union type
type Action<T> =
  | {type: 'loading'}
  | {type: 'fetched'; payload: T}
  | {type: 'error'; payload: Error};

export default function useFetch<T = unknown>(
  type: string,
  pattern: string,
  options?: RequestInit,
): State<T> {
  const url = get_url([type, pattern]);
  const cache = useRef<Cache<T>>({});
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);
  const initialState: State<T> = {
    data: undefined,
    error: undefined,
    state: '',
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return {...initialState, state: action.type};
      case 'fetched':
        return {...initialState, data: action.payload, state: action.type};
      case 'error':
        return {...initialState, error: action.payload, state: action.type};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    if (!url) return;
    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({type: 'loading'});
      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({type: 'fetched', payload: cache.current[url]});
        return;
      }
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json() as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;
        dispatch({type: 'fetched', payload: data});
      } catch (error) {
        if (cancelRequest.current) return;
        dispatch({type: 'error', payload: error as Error});
      }
    };

    void fetchData();
    // Prevent state update on unmount
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return state;
}
