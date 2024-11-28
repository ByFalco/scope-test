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
  };

  const handleApply = () => {
    // Implementa la logica per applicare i filtri
    handleClose();
  };

  return (
    <>
      <div
        className={`filter-overlay ${closing ? 'fade-out' : ''}`}
        onClick={handleClose}
      ></div>
      <div className={`filter-wrapper ${closing ? 'slide-out' : ''}`}>
        <div className="filter-menu">
          <div className="filter-header">
            <h2>Filters</h2>
            <button className="close-button" onClick={handleClose}>×</button>
          </div>

          <div className="filter-content">
            {/* Sezione Checkbox */}
            <div className="filter-section">
              {[
                { label: 'Pump.fun Tokens', key: 'pumpTokens', icon: pumpGreenIcon, glowColor: '#459c6e' },
                { label: 'Moonshot Tokens', key: 'moonshotTokens', icon: moonYellowIcon, glowColor: '#DFFF16' },
              ].map(({ label, key, icon, glowColor }) => (
                <div className="toggle-item" key={key}>
                  <div className="toggle-label-with-icon">
                    <div className={`icon-wrapper ${key}`}>
                      <img src={icon} alt="" />
                    </div>
                    <span className="toggle-label">{label}</span>
                  </div>
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
                        value={filters[key].min}
                        onChange={e => {
                          const value = Math.max(0, Number(e.target.value));
                          setFilters({
                            ...filters,
                            [key]: { ...filters[key], min: value || '' }
                          });
                        }}
                        onWheel={e => {
                          e.preventDefault();
                          const delta = e.deltaY > 0 ? -1 : 1;
                          const currentValue = Number(filters[key].min) || 0;
                          const newValue = Math.max(0, currentValue + delta);
                          setFilters({
                            ...filters,
                            [key]: { ...filters[key], min: newValue }
                          });
                        }}
                        onMouseDown={e => {
                          const startY = e.clientY;
                          const startValue = Number(filters[key].min) || 0;
                          
                          const handleMouseMove = moveEvent => {
                            const deltaY = startY - moveEvent.clientY;
                            const newValue = Math.max(0, startValue + Math.floor(deltaY / 2));
                            setFilters({
                              ...filters,
                              [key]: { ...filters[key], min: newValue }
                            });
                          };
                          
                          const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                          };
                          
                          document.addEventListener('mousemove', handleMouseMove);
                          document.addEventListener('mouseup', handleMouseUp);
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
                        value={filters[key].max}
                        onChange={e => {
                          const value = Math.max(0, Number(e.target.value));
                          setFilters({
                            ...filters,
                            [key]: { ...filters[key], max: value || '' }
                          });
                        }}
                        onWheel={e => {
                          e.preventDefault();
                          const delta = e.deltaY > 0 ? -1 : 1;
                          const currentValue = Number(filters[key].max) || 0;
                          const newValue = Math.max(0, currentValue + delta);
                          setFilters({
                            ...filters,
                            [key]: { ...filters[key], max: newValue }
                          });
                        }}
                        onMouseDown={e => {
                          const startY = e.clientY;
                          const startValue = Number(filters[key].max) || 0;
                          
                          const handleMouseMove = moveEvent => {
                            const deltaY = startY - moveEvent.clientY;
                            const newValue = Math.max(0, startValue + Math.floor(deltaY / 2));
                            setFilters({
                              ...filters,
                              [key]: { ...filters[key], max: newValue }
                            });
                          };
                          
                          const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                          };
                          
                          document.addEventListener('mousemove', handleMouseMove);
                          document.addEventListener('mouseup', handleMouseUp);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-footer">
            <button className="reset-button" onClick={handleReset}>
              <img src={resetIcon} alt="" />
              Reset
            </button>
            <button className="apply-button" onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterMenu;