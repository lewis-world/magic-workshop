import React, { useState, useEffect } from 'react';
import { portalBus } from './magicPortalBus';
import './MagicMicrofrontend.css';

const PotionShop = () => {
  const [potion, setPotion] = useState('福灵剂');
  const [currentHouse, setCurrentHouse] = useState('未知');
  const [isBrewing, setIsBrewing] = useState(false);

  // 监听主应用消息
  useEffect(() => {
    const handleHouseChange = (data) => {
      setCurrentHouse(data.house);
    };
    
    portalBus.on('houseChange', handleHouseChange);
    return () => portalBus.off('houseChange', handleHouseChange);
  }, []);

  const brewPotion = () => {
    setIsBrewing(true);
    setTimeout(() => {
      setIsBrewing(false);
      portalBus.emit('potionBrewed', { 
        potion, 
        brewer: currentHouse,
        message: `${potion}酿造完成！`
      });
    }, 2000);
  };

  return (
    <div className="potion-shop">
      <h2>魔药商店 - {currentHouse}专区</h2>
      <div className="potion-selector">
        <select value={potion} onChange={(e) => setPotion(e.target.value)}>
          {['福灵剂', '复方汤剂', '迷情剂', '活地狱汤剂'].map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button onClick={brewPotion} disabled={isBrewing}>
          {isBrewing ? '酿造中...' : '开始酿造'}
        </button>
      </div>
      
      {isBrewing && (
        <div className="brewing-animation">
          <div className="cauldron"></div>
          <div className="bubbles">
            {[...Array(5)].map((_, i) => <div key={i} className="bubble"></div>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default PotionShop;