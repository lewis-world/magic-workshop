import React from 'react';
import { portalBus } from './magicPortalBus';

const QuidditchGame = () => {
  const [score, setScore] = React.useState(0);
  
  React.useEffect(() => {
    const handleHouseChange = (data) => {
      console.log(`${data.house}学院准备比赛！`);
    };
    portalBus.on('houseChange', handleHouseChange);
    return () => portalBus.off('houseChange', handleHouseChange);
  }, []);

  return (
    <div className="quidditch-game">
      <h2>魁地奇比赛</h2>
      <button onClick={() => setScore(s => s + 10)}>
        得分！当前分数: {score}
      </button>
    </div>
  );
};

export default QuidditchGame;