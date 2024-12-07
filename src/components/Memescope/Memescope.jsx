import React, { useState, useEffect } from 'react';
import VirtualizedList from '../VirtualizedList/VirtualizedList';
import FilterMenu from '../FilterMenu/FilterMenu';
import './Memescope.css';

// Icons
import filterIcon from '../../assets/filter.svg';
import copyIcon from '../../assets/copy.svg';
import copySuccessIcon from '../../assets/copy-success.svg';
import pumpIcon from '../../assets/pump-fun.svg';
import pumpGreenIcon from '../../assets/pump-green.svg';
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
    // Array di coin di esempio per Newly Created
    const newlyCreatedExamples = [
      {
        name: 'X',
        secondName: 'Chromosome X',
        token: '4qrxPryDbGa2RNrRi5mZncMg7ir6rbyXGSV75VqKmoon',
        image: 'https://pbs.twimg.com/profile_images/1865213407428780032/JWwNUOwk_400x400.jpg',
        time: '45s',
        status: 20,
        marketCap: '$25k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'SXC',
        secondName: 'SpaceX Cats Coin',
        token: 'DHcqzaHrzdV63jzjdrq6a6G2cEwfAzhgGZHp1zyaDKNc',
        image: 'https://pbs.twimg.com/profile_images/1799788556015022080/lgDon_jn_400x400.jpg',
        time: '2m',
        status: 15,
        marketCap: '$8.6k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'HEIDRUN',
        secondName: 'Heidrun',
        token: 'DdyoGjgQVT8UV8o7DoyVrBt5AfjrdZr32cfBMvbbPNHM',
        image: 'https://pbs.twimg.com/profile_images/1860346179826987008/lbdeZhL6_400x400.jpg',
        time: '15s',
        status: 10,
        marketCap: '$48k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'PEPENEXT',
        secondName: 'Pepe Next Gen',
        token: 'PEPExT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1863711266671562756/QKq0z4jZ_400x400.jpg',
        time: '30s',
        status: 25,
        marketCap: '$12k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'SHIBA',
        secondName: 'GROWING SHIBA',
        token: 'DOGOxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1864249610581028864/z3tlbiIa_400x400.jpg',
        time: '5m',
        status: 18,
        marketCap: '$15k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'SOLCASINO',
        secondName: 'Solcasino.io',
        token: 'SOLCxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1630676277265854464/yn2zpUVs_400x400.jpg',
        time: '10s',
        status: 22,
        marketCap: '$32k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'XNA',
        secondName: 'XNA Meme Coin',
        token: 'XNAMxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1865221995224281088/lVPfTwky_400x400.jpg',
        time: '1m',
        status: 12,
        marketCap: '$28k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'FROGANCE',
        secondName: 'Frog Elegance',
        token: 'FROGxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1862562424169353216/oh2qk152_400x400.jpg',
        time: '25s',
        status: 16,
        marketCap: '$19k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: '$KAKAMORA',
        secondName: 'CRYPTO WARRIORS',
        token: 'KAKAxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1865095027506003968/j-xd6KZk_400x400.jpg',
        time: '3m',
        status: 14,
        marketCap: '$22k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'BUBUS',
        secondName: 'Bubus',
        token: 'BUBxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1864760371178766336/P3O_UXcm_400x400.jpg',
        time: '40s',
        status: 20,
        marketCap: '$35k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      }
    ];

    // Array di coin di esempio per About to Graduate
    const aboutToGraduateExamples = [
      {
        name: 'RIZZDOLPH',
        secondName: 'RizzRudolph',
        token: 'CPguJCEWtdY3Dz6WzjfhcAbHHbKwruTTD4hy4XwY1fZM',
        image: 'https://pbs.twimg.com/profile_images/1864725934818910208/f1M3zA7r_400x400.jpg',
        time: '45m',
        status: 85,
        marketCap: '$85k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'SOLARIA',
        secondName: 'Solaria Utopia',
        token: 'H3c9RZhvCzxQSmLULh4RsJC8GuK9rVNV2bcoLhMQmoon',
        image: 'https://pbs.twimg.com/profile_images/1861467863388737537/t8cO12f5_400x400.jpg',
        time: '2h',
        status: 90,
        marketCap: '$14k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'PEPEGOLD',
        secondName: 'Pepe Solana',
        token: 'H3c9RZhvCzxQSmLULh4RsJC8GuK9rVNV2bcoLhMQpepe',
        image: 'https://pbs.twimg.com/profile_images/1821584417673846790/sQERWwsB_400x400.jpg',
        time: '15m',
        status: 95,
        marketCap: '$32k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'MUNKI',
        secondName: 'SolanaMunkii',
        token: 'MUNKxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1865135117989015553/04UZbGAF_400x400.jpg',
        time: '1h',
        status: 64,
        marketCap: '$95k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'Microsol',
        secondName: 'Microsol Solana',
        token: 'MSOLxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1860376335383760896/WA0kQJLe_400x400.jpg',
        time: '30m',
        status: 92,
        marketCap: '$125k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'SBTCBG',
        secondName: 'Bitcoin But Green',
        token: 'BTCGxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1864988594366222337/NKF-o4oY_400x400.jpg',
        time: '3h',
        status: 87,
        marketCap: '$78k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: '$VIRGIN',
        secondName: 'Virginsol Coin',
        token: 'NOVAxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1844053260250038272/mFWTkbge_400x400.jpg',
        time: '20m',
        status: 93,
        marketCap: '$145k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'ANALOS',
        secondName: 'Analos',
        token: 'ANLOSxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1834203161055170561/m2JGKHid_400x400.jpg',
        time: '4h',
        status: 89,
        marketCap: '$112k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'Genopets',
        secondName: 'Genopets',
        token: 'GNPDxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1819155612350976001/21hjsDF4_400x400.jpg',
        time: '55m',
        status: 91,
        marketCap: '$168k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'NEBULA',
        secondName: 'Nebula Network',
        token: 'NEBLxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1865341626421243904/vCOedbZX_400x400.jpg',
        time: '5h',
        status: 86,
        marketCap: '$92k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      }
    ];

    // Array di coin di esempio per Graduated
    const graduatedExamples = [
      {
        name: 'BONK',
        secondName: 'Bonk Coin',
        token: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1865044003328294912/hptNZh2q_400x400.jpg',
        time: '12h',
        status: 100,
        marketCap: '$150k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'MYRO',
        secondName: 'Myro Coin',
        token: 'MYRo9wf476Zjh7GtYi2FXHsBpqBpryxnqF2X7SxQmC2',
        image: 'https://pbs.twimg.com/profile_images/1864820136638627840/Ps0bt7jC_400x400.jpg',
        time: '2d',
        status: 100,
        marketCap: '$280k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'WIF',
        secondName: 'Friend.tech',
        token: 'EKpQGSJtjMFqKZ9KQanSqG3GHJPpKxjBhqskBiVh9DTY',
        image: 'https://pbs.twimg.com/profile_images/1865255587644346369/KtP-9OYd_400x400.jpg',
        time: '18h',
        status: 100,
        marketCap: '$420k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'SAMO',
        secondName: 'Samoyedcoin',
        token: 'SAMOxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1864189740855250946/ydf2eolT_400x400.jpg',
        time: '3d',
        status: 100,
        marketCap: '$520k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'COPE',
        secondName: 'Cope Token',
        token: 'COPExT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1858485059038101504/OeKhrjON_400x400.png',
        time: '23h',
        status: 100,
        marketCap: '$680k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'DUST',
        secondName: 'Dust Protocol',
        token: 'DUSTxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1860407294497837057/-CW7pEKT_400x400.jpg',
        time: '4d',
        status: 100,
        marketCap: '$750k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'MEME',
        secondName: 'Memecoin',
        token: 'MEMExT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1865068769560997888/6oBQ7-0Q_400x400.jpg',
        time: '15h',
        status: 100,
        marketCap: '$890k',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'KING',
        secondName: 'King Finance',
        token: 'KINGxT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1863370382880776192/S08BFGV__400x400.jpg',
        time: '5d',
        status: 100,
        marketCap: '$1.2M',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'SOLAI',
        secondName: 'Solai AICHAT',
        token: 'SOLExT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1860665968873156608/ywCC0BLS_400x400.jpg',
        time: '20h',
        status: 100,
        marketCap: '$1.5M',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      },
      {
        name: 'RARE',
        secondName: 'Doge Cloud',
        token: 'RARExT8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        image: 'https://pbs.twimg.com/profile_images/1865299931310788608/azCUYXBt_400x400.jpg',
        time: '6d',
        status: 100,
        marketCap: '$2.1M',
        links: {
          pump: "https://pump.fun/token/xyz",
          twitter: "https://twitter.com/xyz",
          website: "https://xyz.com",
          telegram: "https://t.me/xyz"
        }
      }
    ];

    // Funzione modificata per generare array di coins
    const generateCoins = (prefix, count, exampleCoins) => {
      // Prima inserisce le monete di esempio specifiche per questa lista
      const coins = [...exampleCoins];
      
      // Se servono più monete, aggiunge monete generate automaticamente
      if (count > exampleCoins.length) {
        const additionalCoins = Array.from({ length: count - exampleCoins.length }, (_, index) => ({
          name: `${prefix} ${index + exampleCoins.length + 1}`,
          secondName: `${prefix} ${index + exampleCoins.length + 1}`,
          token: `Token${index + exampleCoins.length + 1}`,
          image: 'https://via.placeholder.com/50',
          time: '10m',
          status: prefix.includes('New') ? 20 : prefix.includes('Completing') ? 85 : 100,
          marketCap: '$10k',
          links: {
            pump: "https://pump.fun/token/xyz",
            twitter: "https://twitter.com/xyz",
            website: "https://xyz.com",
            telegram: "https://t.me/xyz"
          }
        }));
        coins.push(...additionalCoins);
      }
      
      return coins.slice(0, count);
    };

    // Genera 50 elementi per ogni lista usando gli esempi specifici
    const fakeNewlyCreated = generateCoins('New Coin', 50, newlyCreatedExamples);
    const fakeAboutToGraduate = generateCoins('Completing Coin', 50, aboutToGraduateExamples);
    const fakeGraduated = generateCoins('Completed Coin', 50, graduatedExamples);

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
    pumpGreenIcon,
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
