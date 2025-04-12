import React, { useState, useCallback } from 'react';
import './MaraudersMap.css';

// 1. 创建事件总线上下文
const EventBusContext = React.createContext();

// 2. 事件总线提供者
export const EventBusProvider = ({ children }) => {
  const listeners = React.useRef({});

  const subscribe = useCallback((eventName, callback) => {
    listeners.current[eventName] = listeners.current[eventName] || [];
    listeners.current[eventName].push(callback);
    
    // 返回取消订阅函数
    return () => {
      listeners.current[eventName] = listeners.current[eventName]
        .filter(cb => cb !== callback);
    };
  }, []);

  const publish = useCallback((eventName, data) => {
    if (listeners.current[eventName]) {
      listeners.current[eventName].forEach(callback => callback(data));
    }
  }, []);

  return (
    <EventBusContext.Provider value={{ subscribe, publish }}>
      {children}
    </EventBusContext.Provider>
  );
};

// 3. 自定义事件总线hook
export const useEventBus = () => {
  const { subscribe, publish } = React.useContext(EventBusContext);
  
  const emit = useCallback((eventName, data) => {
    publish(eventName, data);
  }, [publish]);
  
  const on = useCallback((eventName, callback) => {
    return subscribe(eventName, callback);
  }, [subscribe]);
  
  return { emit, on };
};

// 4. 简化版魔杖区域组件
const WandArea = React.memo(({ onSpellDetected }) => {
  const [gesture, setGesture] = useState('');
  
  const handleGesture = useCallback((type) => {
    const spells = {
      'swipe-right': 'Lumos',
      'swipe-left': 'Nox',
      'circle': 'Alohomora',
      'zigzag': 'Revelio'
    };
    
    const detectedSpell = spells[type] || 'Unknown';
    setGesture(detectedSpell);
    onSpellDetected(detectedSpell);
  }, [onSpellDetected]);

  return (
    <div className="wand-area">
      <h3>魔杖区域</h3>
      <div className="gesture-buttons">
        <button onClick={() => handleGesture('swipe-right')}>向右滑动</button>
        <button onClick={() => handleGesture('swipe-left')}>向左滑动</button>
        <button onClick={() => handleGesture('circle')}>画圈</button>
        <button onClick={() => handleGesture('zigzag')}>之字形</button>
      </div>
      <p>当前手势: {gesture || '无'}</p>
    </div>
  );
});

// 5. 咒语追踪器组件
const SpellTracker = React.memo(({ spell }) => {
  const [spellHistory, setSpellHistory] = useState([]);

  React.useEffect(() => {
    if (spell) {
      setSpellHistory(prev => [...prev.slice(-3), spell]);
    }
  }, [spell]); // 仅在spell变化时更新

  return (
    <div className="spell-tracker">
      <h3>咒语追踪</h3>
      <div className="current-spell">
        当前咒语: <strong>{spell || '无'}</strong>
      </div>
      <div className="spell-history">
        历史记录: {spellHistory.join(' → ')}
      </div>
    </div>
  );
});

// 6. 秘密通道组件
const SecretPassage = React.memo(({ onTap }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleTap = useCallback(() => {
    setIsRevealed(prev => !prev);
    onTap();
  }, [onTap]);

  return (
    <div className={`secret-passage ${isRevealed ? 'revealed' : ''}`}>
      <button onClick={handleTap}>
        {isRevealed ? '隐藏秘密通道' : '点击显示秘密通道'}
      </button>
      {isRevealed && (
        <div className="passage-content">
          <p>通往蜂蜜公爵的通道已开启!</p>
          <div className="passage-icon">🕳️</div>
        </div>
      )}
    </div>
  );
});

// 7. 主活点地图组件
export const MaraudersMap = () => {
  const { emit, on } = useEventBus();
  const [currentSpell, setCurrentSpell] = useState(null);

  // 使用useCallback避免每次渲染都创建新函数
  const handleSpellDetected = useCallback((spell) => {
    emit('spellDetected', spell);
  }, [emit]);

  const revealPath = useCallback(() => {
    emit('passageRevealed', Date.now());
    console.log('秘密通道被打开了!');
  }, [emit]);

  // 使用useMemo优化事件监听
  React.useEffect(() => {
    const unsubscribe = on('spellDetected', setCurrentSpell);
    return unsubscribe;
  }, [on]); // 依赖项只有on，它是稳定的

  return (
    <div className="parchment">
      <h2>活点地图</h2>
      <div className="map-content">
        <WandArea onSpellDetected={handleSpellDetected} />
        <SpellTracker spell={currentSpell} />
        <SecretPassage onTap={revealPath} />
      </div>
    </div>
  );
};