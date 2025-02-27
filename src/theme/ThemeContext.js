import React, { createContext, useState, useContext } from 'react';
import { lightTheme, darkTheme } from '../theme/colors'; // Импорт тем

// Создаем контекст
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext); // Хук для использования темы в компонентах

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme); // Стейт для текущей темы

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
