import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Memescope from './components/Memescope/Memescope.jsx';
import logo from './assets/bloom.svg';
import searchIcon from './assets/search.svg';
import clearIcon from './assets/clear.svg';

function App() {
  const [searchText, setSearchText] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleClearSearch = () => {
    setSearchText('');
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const handleMenuToggle = (e) => {
    setIsMenuOpen(e.target.checked);
    if (e.target.checked) {
      setIsMobileSearchOpen(false);
    }
  };

  const navClassName = `${isMenuOpen || isFilterOpen ? 'menu-open' : ''}`;

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <nav className={navClassName}>
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
            <div className={`mobile-search-container ${isMenuOpen ? 'hidden' : ''}`}>
              <input
                type="text"
                className={`mobile-search-input ${isMobileSearchOpen ? 'open' : ''}`}
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && isMobileSearchOpen && (
                <img
                  src={clearIcon}
                  alt="Clear"
                  className={`clear-icon-mobile ${searchText ? 'visible' : ''}`}
                  onClick={handleClearSearch}
                />
              )}
              <img
                src={searchIcon}
                alt="Search"
                className={`search-icon-mobile ${isMobileSearchOpen ? 'open' : ''}`}
                onClick={toggleMobileSearch}
              />
            </div>

            <input 
              type="checkbox" 
              id="hamburger-toggle" 
              onChange={handleMenuToggle}
              checked={isMenuOpen}
            />
            <label className="hamburger" htmlFor="hamburger-toggle">
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>

            <button className="connect-button">
              <div className="sparkle">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" />
                  <path d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z" />
                </svg>
              </div>
              <span>Connect</span>
            </button>

            <div className="hamburger-menu">
              <div className="hamburger-menu-content">
                <button className="connect-button">
                  <div className="sparkle">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" />
                      <path d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z" />
                    </svg>
                  </div>
                  <span>Connect</span>
                </button>
              </div>
            </div>
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
