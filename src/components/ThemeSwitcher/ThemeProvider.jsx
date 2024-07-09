import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from 'redux/slimDaddy/selectors.slimDaddy';


export const ThemeContext = createContext({ theme: 'light' });

const ThemeProvider = ({ children }) => {
  const selectedTheme = useSelector(getTheme);

  return (
    <ThemeContext.Provider value={selectedTheme}>
        {children}
    </ThemeContext.Provider>
  );
};

export{ ThemeProvider };