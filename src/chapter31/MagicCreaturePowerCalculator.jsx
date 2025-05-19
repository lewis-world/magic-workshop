import { useState, useEffect, useRef } from 'react';
import './MagicCreaturePowerCalculator.css';

function MagicCreaturePowerCalculator() {
  const [creature, setCreature] = useState('unicorn');
  const [level, setLevel] = useState(5);
  const [isCalculating, setIsCalculating] = useState(false);
  const [power, setPower] = useState(null);
  const [history, setHistory] = useState([]);
  const workerRef = useRef(null);

  // 初始化Web Worker
  useEffect(() => {
    workerRef.current = new Worker(new URL('./creatureWorker.js', import.meta.url));
    
    workerRef.current.onmessage = (e) => {
      const { power, calculationTime } = e.data;
      setPower(power);
      setIsCalculating(false);
      setHistory(prev => [
        ...prev,
        { creature, level, power, time: calculationTime }
      ]);
    };

    workerRef.current.onerror = (e) => {
      console.error('Worker错误:', e);
      setIsCalculating(false);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, [creature, level]);

  const calculatePower = () => {
    if (isCalculating) return;
    
    setIsCalculating(true);
    setPower(null);
    
    // 使用Transferable对象传输大数据
    const levelData = new Uint8Array([level]);
    workerRef.current.postMessage(
      { creature, levelData },
      [levelData.buffer] // 标记为Transferable
    );
  };

  return (
    <div className="magic-container">
      <h1>✨ 魔法生物战斗力计算器</h1>
      
      <div className="control-panel">
        <div className="input-group">
          <label htmlFor="creature">选择生物:</label>
          <select 
            id="creature" 
            value={creature} 
            onChange={(e) => setCreature(e.target.value)}
          >
            <option value="unicorn">独角兽 🦄</option>
            <option value="dragon">火龙 🐉</option>
            <option value="phoenix">凤凰 🦅</option>
            <option value="griffin">狮鹫 🦁</option>
          </select>
        </div>
        
        <div className="input-group">
          <label htmlFor="level">等级 (1-10):</label>
          <input
            id="level"
            type="range"
            min="1"
            max="10"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          />
          <span>{level}</span>
        </div>
        
        <button 
          onClick={calculatePower}
          disabled={isCalculating}
          className="calculate-btn"
        >
          {isCalculating ? '计算中...' : '计算战斗力'}
        </button>
      </div>
      
      {power !== null && (
        <div className="result">
          <h2>
            {getCreatureEmoji(creature)} {creature} (Lv.{level}) 战斗力:
          </h2>
          <div className="power-value">{power.toFixed(2)}</div>
          <div className="power-bar" style={{ width: `${Math.min(100, power)}%` }}></div>
        </div>
      )}
      
      {history.length > 0 && (
        <div className="history">
          <h3>📜 计算历史</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                {getCreatureEmoji(item.creature)} {item.creature} Lv.{item.level}: 
                <strong>{item.power.toFixed(2)}</strong> 
                (耗时: {item.time}ms)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// 辅助函数：获取生物表情符号
function getCreatureEmoji(creature) {
  const emojiMap = {
    unicorn: '🦄',
    dragon: '🐉',
    phoenix: '🦅',
    griffin: '🦁'
  };
  return emojiMap[creature] || '❓';
}

export default MagicCreaturePowerCalculator;