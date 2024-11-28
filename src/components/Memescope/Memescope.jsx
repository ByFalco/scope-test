import React, { useState, useEffect } from 'react';
import VirtualizedList from '../VirtualizedList/VirtualizedList';
import FilterMenu from '../FilterMenu/FilterMenu';
import './Memescope.css';

// Icons
import filterIcon from '../../assets/filter.svg';
import copyIcon from '../../assets/copy.svg';
import copySuccessIcon from '../../assets/copy-success.svg';
import pumpIcon from '../../assets/pump-fun.svg';
import twitIcon from '../../assets/twitterx.svg';
import siteIcon from '../../assets/site.svg';
import tgIcon from '../../assets/telegram.svg';


function Memescope() {
  const [newlyCreated, setNewlyCreated] = useState([]);
  const [aboutToGraduate, setAboutToGraduate] = useState([]);
  const [graduated, setGraduated] = useState([]);
  const [copiedTokens, setCopiedTokens] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterClosing, setIsFilterClosing] = useState(false);

  const abbreviateToken = (token) => {
    return `${token.slice(0, 3)}...${token.slice(-3)}`;
  };

  const handleCopyToken = (token) => {
    navigator.clipboard.writeText(token);
    setCopiedTokens((prevCopiedTokens) => ({
      ...prevCopiedTokens,
      [token]: true,
    }));
    setTimeout(() => {
      setCopiedTokens((prevCopiedTokens) => ({
        ...prevCopiedTokens,
        [token]: false,
      }));
    }, 3000);
  };

  const openFilter = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterClosing(false);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    // Template per una singola coin
    const coinTemplate = {
      name: 'Coin',
      secondName: 'Second',
      token: 'C5DcdswHPgrs7uFvbiLTHS6y5jn4PZ5KycKrTPp2pump',
      image: 'https://via.placeholder.com/50',
      time: '10m',
      status: 0,
      marketCap: '$10k',
      links: {
        pump: "https://pump.fun/token/xyz",
        twitter: "https://twitter.com/xyz",
        website: "https://xyz.com",
        telegram: "https://t.me/xyz"
      }
    };

    // Funzione per generare array di coins
    const generateCoins = (prefix, count) => {
      return Array.from({ length: count }, (_, index) => ({
        ...coinTemplate,
        id: index + 1,
        name: `${prefix} ${index + 1}`,
        secondName: `${prefix} ${index + 1}`,
        token: `Token${index + 1}`,
      }));
    };

    // Genera 50 elementi per ogni lista
    const fakeNewlyCreated = generateCoins('New Coin', 50);
    const fakeAboutToGraduate = generateCoins('Completing Coin', 50);
    const fakeGraduated = generateCoins('Completed Coin', 50);

    setNewlyCreated(fakeNewlyCreated);
    setAboutToGraduate(fakeAboutToGraduate);
    setGraduated(fakeGraduated);
  }, []);

  const listProps = {
    abbreviateToken,
    handleCopyToken,
    copiedTokens,
    copyIcon,
    copySuccessIcon,
    pumpIcon,
    twitIcon,
    siteIcon,
    tgIcon,
    filterIcon,
  };

  return (
    <div className="memescope">
      <h1>Memescope</h1>
      <p>Discover top pump.fun and Moonshot tokens and track the latest migrations with real-time customized feeds.</p>
      <div className="divider"></div>
      <div className="lists-container">
        <VirtualizedList
          items={newlyCreated}
          title="Newly Created"
          onFilterClick={openFilter}
          listProps={listProps}
        />
        <VirtualizedList
          items={aboutToGraduate}
          title="Completing"
          onFilterClick={openFilter}
          listProps={listProps}
        />
        <VirtualizedList
          items={graduated}
          title="Completed"
          onFilterClick={openFilter}
          listProps={listProps}
        />
      </div>

      <button onClick={openFilter}>Open Filter</button>

      {(isFilterOpen || isFilterClosing) && (
        <FilterMenu onClose={handleFilterClose} />
      )}
    </div>
  );
}

export default Memescope;
