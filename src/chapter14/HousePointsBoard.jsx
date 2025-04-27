import { useState, useEffect } from 'react';

export default function HousePointsBoard() {
  const [scores, setScores] = useState({
    Gryffindor: 100,
    Slytherin: 90,
    Ravenclaw: 80,
    Hufflepuff: 70
  });
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    // 创建 WebSocket 连接
    const ws = new WebSocket('ws://localhost:8000/ws/scores');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setScores(prev => ({
        ...prev,
        [data.house]: data.score
      }));
      setLastUpdate(`${data.house} +${data.change}`);
    };

    return () => ws.close(); // 组件卸载时关闭连接
  }, []);

  return (
    <div className="house-points">
      <h2>🏆 学院杯实时分数</h2>
      <div className="houses">
        {Object.entries(scores).map(([house, score]) => (
          <div key={house} className="house">
            <span className="badge">{house}</span>
            <span className="points">{score} 分</span>
          </div>
        ))}
      </div>
      {lastUpdate && <div className="update">最新: {lastUpdate}</div>}
    </div>
  );
}