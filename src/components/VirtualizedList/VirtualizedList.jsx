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
    twitIcon,
    siteIcon,
    tgIcon,
  } = props;

  const isCopied = copiedTokens[coin.token];

  return (
    <div style={style}>
      <div className="coin-card">
        <img src={coin.image} alt={coin.name} className="coin-logo" />
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
              title="Copy Token"
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
              <span className="status">{coin.status}%</span>
              <div className="social-links">
                <a href={coin.links.pump} target="_blank" rel="noopener noreferrer">
                  <img src={pumpIcon} alt="Pump" className="social-icon" />
                </a>
                <a href={coin.links.twitter} target="_blank" rel="noopener noreferrer">
                  <img src={twitIcon} alt="Twitter" className="social-icon" />
                </a>
                <a href={coin.links.website} target="_blank" rel="noopener noreferrer">
                  <img src={siteIcon} alt="Website" className="social-icon" />
                </a>
                <a href={coin.links.telegram} target="_blank" rel="noopener noreferrer">
                  <img src={tgIcon} alt="Telegram" className="social-icon" />
                </a>
              </div>
            </div>
            <div className="market-cap">
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