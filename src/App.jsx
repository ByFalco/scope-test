import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Memescope from './components/Memescope/Memescope.jsx';
import logo from './assets/bloom.svg';
import searchIcon from './assets/search.svg';
import clearIcon from './assets/clear.svg';

function App() {
  const [searchText, setSearchText] = useState('');

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <div className="nav-left">
            <a href="#" className="logo-link">
              <img src={logo} alt="Memescope" className="nav-logo" />
            </a>
          </div>
          
          <div className="nav-center">
            <div className="search-container">
              <img src={searchIcon} alt="Search" className="search-icon" />
              <input
                type="text"
                className="search-bar"
                placeholder="Search by ticker, token name or contract address"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <img
                  src={clearIcon}
                  alt="Clear"
                  className="clear-icon"
                  onClick={handleClearSearch}
                />
              )}
            </div>
          </div>
          
          <div className="nav-right">
            <button className="connect-button">
              Connect
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Memescope />} />
          <Route path="/memescope" element={<Memescope />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
