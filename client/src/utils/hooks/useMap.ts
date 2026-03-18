import { useReducer } from 'react';

export enum ACTION_TYPES {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  CLEAR = 'CLEAR',
}

export type MapAction<K, V> =
  | { type: ACTION_TYPES.ADD | ACTION_TYPES.UPDATE; key: K; value: V }
  | { type: ACTION_TYPES.DELETE; key: K }
  | { type: ACTION_TYPES.CLEAR };

/**
 * A custom hook for managing Map data structure in React state
 * @param initialValue - The initial Map to use
 * @returns [map, dispatch] - The current map state and dispatch function
 */
function useMap<K, V>(
  cachingConfiguration: { shouldCache: boolean; cacheKey: string } = {
    shouldCache: false,
    cacheKey: '',
  },
) {
  const reducer = (state: Map<K, V>, action: MapAction<K, V>): Map<K, V> => {
    const newMap = new Map(state);

    switch (action.type) {
      case ACTION_TYPES.ADD:
      case ACTION_TYPES.UPDATE:
        newMap.set(action.key, action.value);
        break;
      case ACTION_TYPES.DELETE:
        newMap.delete(action.key);
        break;
      case ACTION_TYPES.CLEAR:
        newMap.clear();
        break;
    }

    if (cachingConfiguration.shouldCache) {
      sessionStorage.setItem(
        cachingConfiguration.cacheKey,
        JSON.stringify(Array.from(newMap.entries())),
      );
    }

    return newMap;
  };
  function getInitialValue() {
    if (cachingConfiguration.shouldCache && cachingConfiguration.cacheKey) {
      const storedValue = sessionStorage.getItem(cachingConfiguration.cacheKey);
      if (storedValue) {
        try {
          return new Map(JSON.parse(storedValue));
        } catch {
          return new Map(); // fallback on parse failure
        }
      }
    }
    return new Map();
  }

  const [map, dispatch] = useReducer(reducer, getInitialValue());

  return [map, dispatch] as const;
}

export default useMap;
