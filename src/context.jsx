import {
  createContext,
  useContext,
  useReducer,
} from 'react';

import reducer from './reducer';

const AppContext = createContext();

const initialState = {
  counter: 0,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
