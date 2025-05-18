import React, { useState, useEffect } from 'react';
import { portalBus } from './magicPortalBus';
import './MagicMicrofrontend.css';

// 子应用组件映射表
const SUBAPPS = {
  potion: React.lazy(() => import('./PotionShop')),
  quidditch: React.lazy(() => import('./QuidditchGame')), // 假设有这个组件
  library: React.lazy(() => import('./LibraryApp')) // 假设有这个组件
};

const useCrystalBall = (initialState) => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    const handleUpdate = (newState) => {
      setState(prev => ({ ...prev, ...newState }));
    };
    portalBus.on('globalStateUpdate', handleUpdate);
    return () => portalBus.off('globalStateUpdate', handleUpdate);
  }, []);

  const updateState = (newState) => {
    setState(prev => ({ ...prev, ...newState }));
    portalBus.emit('globalStateUpdate', newState);
  };

  return [state, updateState];
};

const HogwartsMain = () => {
  const [currentHouse, setHouse] = useCrystalBall({ house: '格兰芬多' });
  const [activeApp, setActiveApp] = useState(null);
  const [points, setPoints] = useState(0);
  const [SubAppComponent, setSubAppComponent] = useState(null);

  const fetchHousePoints = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const points = {
          格兰芬多: 350,
          斯莱特林: 320,
          拉文克劳: 280,
          赫奇帕奇: 310
        };
        resolve(points[currentHouse.house]);
      }, 500);
    });
  };

  useEffect(() => {
    fetchHousePoints().then(setPoints);
  }, [currentHouse.house]);

  // 加载子应用
  const loadMicroApp = (appName) => {
    setActiveApp(appName);
    setSubAppComponent(SUBAPPS[appName]);
  };

  return (
    <div className="magic-container">
      <header className="magic-header">
        <h1>霍格沃茨魔法学院</h1>
        <div className="house-selector">
          <label>当前学院：</label>
          <select 
            value={currentHouse.house}
            onChange={(e) => setHouse({ house: e.target.value })}
          >
            {['格兰芬多', '斯莱特林', '拉文克劳', '赫奇帕奇'].map(house => (
              <option key={house} value={house}>{house}</option>
            ))}
          </select>
          <div className="house-points">学院分: {points}</div>
        </div>
      </header>

      <nav className="magic-nav">
        <button onClick={() => loadMicroApp('potion')}>魔药课</button>
        <button onClick={() => loadMicroApp('quidditch')}>魁地奇</button>
        <button onClick={() => loadMicroApp('library')}>图书馆</button>
      </nav>

      <main className="magic-main">
        <React.Suspense fallback={<div className="loading">加载魔法中...</div>}>
          {SubAppComponent ? (
            <div className="subapp-container">
              <SubAppComponent />
              <div className="quantum-channel">
                <p>通过量子信道通信：</p>
                <button onClick={() => portalBus.emit('houseChange', currentHouse)}>
                  发送学院信息
                </button>
              </div>
            </div>
          ) : (
            <div className="welcome-message">
              <h2>欢迎来到魔法世界</h2>
              <p>选择一个魔法模块开始你的旅程</p>
            </div>
          )}
        </React.Suspense>
      </main>

      <footer className="magic-footer">
        <p>使用React 19魔法微前端构建</p>
      </footer>
    </div>
  );
};

export default HogwartsMain;