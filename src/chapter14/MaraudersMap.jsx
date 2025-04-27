'use client'; // 🔮 必须声明客户端魔法
import { useState } from 'react';
export function MaraudersMap() {
  // 使用霍格沃茨定位魔法（客户端状态）
  const [currentLocation, setLocation] = useState("礼堂");
  const [secretPaths, setPaths] = useState([]);

  // 夜游时更新位置
  const sneakAround = () => {
    const locations = [
      "厨房", "奖杯室", "有求必应屋", 
      "校长办公室", "禁林边缘"
    ];
    setLocation(locations[Math.floor(Math.random() * locations.length)]);
    setPaths([...secretPaths, currentLocation]);
  };

  return (
    <div className="parchment-map">
      <h3>🦉 活点地图 🦉</h3>
      <p>当前位置: <span className="glowing-text">{currentLocation}</span></p>
      <button onClick={sneakAround} className="cloak-button">
        🧹 使用隐形斗篷移动
      </button>
      
      {secretPaths.length > 0 && (
        <div className="secret-paths">
          <p>已发现密道:</p>
          <ul>
            {secretPaths.map((path, i) => (
              <li key={i}>🚪 {path}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}