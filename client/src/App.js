import React from 'react';
import Header from './components/header/Header';
import Pages from './components/mainpages/Pages';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Header />
            <Pages />
          </div>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
