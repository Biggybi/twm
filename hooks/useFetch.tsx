import {useEffect, useReducer, useRef} from 'react';

function get_url(urlparts: string[]) {
  var base_url = 'http://192.168.0.21:20001/twm/web';
  // var base_url = 'http://192.168.1.133:20001/twm/web';
  urlparts.unshift(base_url);
  var url = urlparts.join('/');
  console.log('usefetch url', url)
  return url;
}

interface State<T> {
  data: T | undefined;
  error: Error | undefined;
  status: string;
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
  // prevent status update on component unmount
  const cancelRequest = useRef(false);
  const initialState: State<T> = {
    data: undefined,
    error: undefined,
    status: '',
  };

  console.log('-> useFetch');
  console.log('usefetch pattern:', pattern);

  // Keep status logic separated
  const fetchReducer = (status: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return {...initialState, status: action.type};
      case 'fetched':
        return {...initialState, data: action.payload, status: action.type};
      case 'error':
        return {...initialState, error: action.payload, status: action.type};
      default:
        return status;
    }
  };

  const [status, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    console.log('useEffect');
    if (!url) {
      console.log('no url');
      return;
    }
    cancelRequest.current = false;

    const fetchData = async () => {
      console.log('fecth data')
      dispatch({type: 'loading'});
      // use cache
      if (cache.current[url]) {
        dispatch({type: 'fetched', payload: cache.current[url]});
        console.log('using cache');
        return;
      }
      try {
        const response = await fetch(url, options); // data query
        // if (!response.ok) throw new Error(response.statusText); // error exit
        const data = (await response.json()) as T; // data store
        console.log('usefetch data response ok: ', response.ok);
        cache.current[url] = data; // data cache
        if (cancelRequest.current) {
          console.log('try: cancel request');
          return;
        }
        dispatch({type: 'fetched', payload: data}); // data return
      } catch (error) {
        // error handling
        console.log('error');
        if (cancelRequest.current) {
          console.log('error: cancel request');
          return;
        }
        console.log('error: error');
        dispatch({type: 'error', payload: error as Error});
      }
    };
    void fetchData();

    console.log('usefetch end')
    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return status;
}
