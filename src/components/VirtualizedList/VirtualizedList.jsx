import React, { memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import './VirtualizedList.css';

const CoinRow = memo(({ data, index, style }) => {
  const { items, props } = data;
  const coin = items[index];
  const {
    abbreviateToken,
    handleCopyToken,
    copiedTokens,
    copyIcon,
    copySuccessIcon,
    pumpIcon,
    pumpGreenIcon,
    twitIcon,
    siteIcon,
    tgIcon,
  } = props;

  const isCopied = copiedTokens[coin.token];
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * coin.status) / 100;

  const getStatusClass = (status) => {
    if (status < 25) return "low";
    if (status < 50) return "medium";
    if (status < 80) return "high";
    return "excellent";
  };

  const getStatusGradient = (status) => {
    if (status < 80) return {
      id: "gradientWhite",
      colors: ["#FFFFFF", "#F5F5F5"]
    };
    return {
      id: "gradientExcellent",
      colors: ["#FFF6FB", "#EEA7ED", "#CA93F0", "#A190F2", "#6FC3F1", "#479CEE", "#B1D2F1"]
    };
  };

  const gradient = getStatusGradient(coin.status);

  return (
    <div style={style}>
      <div className="coin-card">
        <div className="coin-logo-wrapper">
          <svg className="progress-circle" viewBox="0 0 80 80">
            <defs>
              {gradient.id === "gradientExcellent" ? (
                <linearGradient id={gradient.id} gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor={gradient.colors[0]} />
                  <stop offset="15%" stopColor={gradient.colors[1]} />
                  <stop offset="30%" stopColor={gradient.colors[2]} />
                  <stop offset="45%" stopColor={gradient.colors[3]} />
                  <stop offset="60%" stopColor={gradient.colors[4]} />
                  <stop offset="75%" stopColor={gradient.colors[5]} />
                  <stop offset="90%" stopColor={gradient.colors[6]} />
                  <stop offset="100%" stopColor={gradient.colors[6]} />
                </linearGradient>
              ) : (
                <linearGradient id={gradient.id} gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor={gradient.colors[0]} />
                  <stop offset="100%" stopColor={gradient.colors[1]} />
                </linearGradient>
              )}
            </defs>
            <circle
              className="progress-circle-bg"
              cx="40"
              cy="40"
              r={radius}
            />
            <circle
              className="progress-circle-fg"
              cx="40"
              cy="40"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              data-value={getStatusClass(coin.status)}
            />
          </svg>
          <img src={coin.image} alt={coin.name} className="coin-logo" />
          <div className="status-icon">
            <img src={pumpGreenIcon} alt="Pump Status" />
          </div>
        </div>
        <div className="coin-info">
          <div className="name-container">
            <h3>{coin.name}</h3>
            <span className="second-name">{coin.secondName}</span>
          </div>
          <div className="token-container">
            <span className="time">{coin.time}</span>
            <span className="token">{abbreviateToken(coin.token)}</span>
            <button 
              className="copy-button"
              onClick={() => handleCopyToken(coin.token)}
              data-tooltip="Copy Token"
            >
              <img 
                src={isCopied ? copySuccessIcon : copyIcon} 
                alt="Copy Token" 
                className="copy-icon" 
              />
            </button>
          </div>
          <div className="status-container">
            <div className="status-left">
              <span className="status" data-value={getStatusClass(coin.status)}>
                {coin.status}%
              </span>
              <div className="social-links">
                <a href={coin.links.pump} target="_blank" rel="noopener noreferrer" data-tooltip="View pump.fun">
                  <img src={pumpIcon} alt="Pump" className="social-icon" />
                </a>
                <a href={coin.links.twitter} target="_blank" rel="noopener noreferrer" data-tooltip="Visit Twitter">
                  <img src={twitIcon} alt="Twitter" className="social-icon" />
                </a>
                <a href={coin.links.website} target="_blank" rel="noopener noreferrer" data-tooltip="Visit Website">
                  <img src={siteIcon} alt="Website" className="social-icon" />
                </a>
                <a href={coin.links.telegram} target="_blank" rel="noopener noreferrer" data-tooltip="Join Telegram">
                  <img src={tgIcon} alt="Telegram" className="social-icon" />
                </a>
              </div>
            </div>
            <div className="market-cap" data-tooltip="Market Cap">
              <span className="mc-label">MC:</span>
              <span className="mc-value">{coin.marketCap}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const VirtualizedList = ({ 
  items, 
  title,
  onFilterClick,
  listProps,
  className = ''
}) => {
  return (
    <div className={`list ${className}`}>
      <h2>
        {title}
        <button className="filter-button" onClick={onFilterClick}>
          <img src={listProps.filterIcon} alt="Filter" className="filter-icon" />
          Filter
        </button>
      </h2>
      <div className="coins-container">
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="virtual-scroll"
              height={height}
              itemCount={items.length}
              itemSize={100}
              width={width}
              itemData={{
                items,
                props: listProps,
              }}
            >
              {CoinRow}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default memo(VirtualizedList);