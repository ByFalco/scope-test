import React, { useState, useEffect } from 'react';
import pumpGreenIcon from '../../assets/pump-green.svg';
import moonYellowIcon from '../../assets/moon-yellow.svg';
import resetIcon from '../../assets/reset.svg';
import './FilterMenu.css';

function FilterMenu({ onClose }) {
  const [filters, setFilters] = useState({
    pumpTokens: true,
    moonshotTokens: true,
    topHolders: false,
    withSocial: false,
    bCurve: { min: '', max: '' } ,
    devHolding: { min: '', max: '' },
    holders: { min: '', max: '' },
    liquidity: { min: '', max: '' },
    volume: { min: '', max: '' },
    marketCap: { min: '', max: '' },
    txns: { min: '', max: '' },
    buys: { min: '', max: '' },
    sells: { min: '', max: '' },
    tokenAge: { min: '', max: '' }
  });

  const [closing, setClosing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorFading, setIsErrorFading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const inputs = document.querySelectorAll('.range-inputs input');
    inputs.forEach(input => {
      input.addEventListener('wheel', handleWheel, { passive: false });
      return () => input.removeEventListener('wheel', handleWheel, { passive: false });
    });

    function handleWheel(e) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -1 : 1;
      const key = e.target.getAttribute('data-key');
      const type = e.target.getAttribute('data-type');
      
      if (key && type) {
        const currentValue = Number(filters[key][type]) || 0;
        const newValue = Math.max(0, currentValue + delta);
        setFilters(prev => ({
          ...prev,
          [key]: { ...prev[key], [type]: newValue }
        }));
      }
    }
  }, [filters]);

  const handleClose = () => {
    setClosing(true);
  };

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        onClose();
      }, 400); // Durata dell'animazione in ms (deve corrispondere a quella definita in CSS)
      return () => clearTimeout(timer);
    }
  }, [closing, onClose]);

  const handleReset = () => {
    setIsResetting(true);
    
    // Reset dei filtri
    setFilters({
      pumpTokens: true,
      moonshotTokens: true,
      topHolders: false,
      withSocial: false,
      bCurve: { min: '', max: '' },
      devHolding: { min: '', max: '' },
      holders: { min: '', max: '' },
      liquidity: { min: '', max: '' },
      volume: { min: '', max: '' },
      marketCap: { min: '', max: '' },
      txns: { min: '', max: '' },
      buys: { min: '', max: '' },
      sells: { min: '', max: '' },
      tokenAge: { min: '', max: '' }
    });

    // Rimuovi la classe dopo che l'animazione è completata
    setTimeout(() => {
      setIsResetting(false);
    }, 600); // Durata dell'animazione
  };

  const handleApply = () => {
    // Implementa la logica per applicare i filtri
    handleClose();
  };

  const handleTokenFilterChange = (key, checked) => {
    const otherTokenKey = key === 'pumpTokens' ? 'moonshotTokens' : 'pumpTokens';
    
    if (!checked && !filters[otherTokenKey]) {
      if (!errorMessage && !isErrorFading) {
        setErrorMessage('At least one of the Moonshot Tokens and Pump.fun Tokens should be enabled');
        
        // Effetto shake sullo switch
        const switchElement = document.querySelector(`[data-switch="${key}"]`);
        if (switchElement && !switchElement.classList.contains('error-state')) {
          switchElement.classList.add('error-state');
          
          setTimeout(() => {
            switchElement.classList.remove('error-state');
          }, 500);
        }
        
        // Gestione fadeOut del messaggio
        setTimeout(() => {
          setIsErrorFading(true);
          setTimeout(() => {
            setErrorMessage('');
            setIsErrorFading(false);
          }, 300);
        }, 3000);
      }
      return;
    }

    setErrorMessage('');
    setFilters({...filters, [key]: checked});
  };

  return (
    <>
      <div
        className={`filter-overlay ${closing ? 'fade-out' : ''}`}
        onClick={handleClose}
      ></div>
      
      {errorMessage && (
        <div className={`global-error-message ${isErrorFading ? 'fade-out' : ''}`}>
          <div className="error-icon">!</div>
          {errorMessage}
        </div>
      )}

      <div className={`filter-wrapper ${closing ? 'slide-out' : ''}`}>
        <div className="filter-menu">
          <div className="filter-header">
            <h2>Filters</h2>
            <button className="close-button" onClick={handleClose}>×</button>
          </div>

          <div className="filter-content">
            <div className="filter-section">
              {[
                { label: 'Pump.fun Tokens', key: 'pumpTokens', icon: pumpGreenIcon },
                { label: 'Moonshot Tokens', key: 'moonshotTokens', icon: moonYellowIcon },
              ].map(({ label, key, icon }) => (
                <div className="toggle-item" key={key}>
                  <div className="toggle-label-with-icon">
                    <div className={`icon-wrapper ${key}`}>
                      <img src={icon} alt="" />
                    </div>
                    <span className="toggle-label">{label}</span>
                  </div>
                  <label className="toggle-switch" data-switch={key}>
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={e => handleTokenFilterChange(key, e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}

              <div className="checkbox-divider"></div>

              {[
                { label: 'Top 10 Holders', key: 'topHolders' },
                { label: 'With at least 1 social', key: 'withSocial' }
              ].map(({ label, key }) => (
                <div className="toggle-item" key={key}>
                  <span className="toggle-label">{label}</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={e => setFilters({...filters, [key]: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>

            <div className="filter-divider"></div>

            {/* Sezione Range Inputs */}
            <div className="filter-section">
              {[
                { label: 'B.Curve %', prefix: '%', key: 'bCurve' }, 
                { label: 'Dev holding %', prefix: '%', key: 'devHolding' },
                { label: 'Holders', key: 'holders' },
                { label: 'Liquidity', key: 'liquidity', prefix: '$' },
                { label: 'Volume', key: 'volume', prefix: '$' },
                { label: 'Market Cap', key: 'marketCap', prefix: '$' },
                { label: 'Txns', key: 'txns' },
                { label: 'Buys', key: 'buys' },
                { label: 'Sells', key: 'sells' },
                { label: 'Token Age (mins)', key: 'tokenAge' }
              ].map(({ label, key, prefix }) => (
                <div className="range-group" key={key}>
                  <span className="range-label">{label}</span>
                  <div className="range-inputs">
                    <div className={`input-wrapper ${prefix ? 'has-prefix' : ''}`}>
                      {prefix && <span className="prefix">{prefix}</span>}
                      <input
                        type="number"
                        min="0"
                        step="any"
                        placeholder="Min"
                        data-key={key}
                        data-type="min"
                        value={filters[key].min}
                        onChange={e => {
                          const value = Math.max(0, Number(e.target.value));
                          setFilters({
                            ...filters,
                            [key]: { ...filters[key], min: value || '' }
                          });
                        }}
                      />
                    </div>
                    <div className="input-wrapper">
                      {prefix && <span className="prefix">{prefix}</span>}
                      <input
                        type="number"
                        min="0"
                        step="any"
                        placeholder="Max"
                        data-key={key}
                        data-type="max"
                        value={filters[key].max}
                        onChange={e => {
                          const value = Math.max(0, Number(e.target.value));
                          setFilters({
                            ...filters,
                            [key]: { ...filters[key], max: value || '' }
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-footer">
            <button className={`reset-button ${isResetting ? 'resetting' : ''}`} onClick={handleReset}>
              <img src={resetIcon} alt="" />
              Reset
            </button>
            <button className="apply-button" onClick={handleApply}>
              <span>Apply</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterMenu;