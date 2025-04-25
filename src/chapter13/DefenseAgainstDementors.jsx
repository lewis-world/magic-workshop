import React, { useState } from 'react';

const PatronusSpell = React.memo(({ magicPower }) => {
    console.log("✨ 守护神实体化！");
    return (
      <div className="patronus-container" style={{
        padding: '1rem',
        backgroundColor: '#0b3d91',
        color: 'white',
        borderRadius: '8px',
        boxShadow: `0 0 15px ${magicPower > 100 ? 'gold' : 'silver'}`
      }}>
        <h3>Expecto Patronum!</h3>
        <p>当前守护神等级: <span className="power-level">{magicPower}</span></p>
        {magicPower > 150 && <div className="sparkle-effect">⚡ 终极守护神形态 ⚡</div>}
      </div>
    );
  });
  
  // 使用示例
  export function DefenseAgainstDementors() {
    const [power, setPower] = useState(100);
    
    return (
      <div className="dada-classroom">
        <button onClick={() => setPower(p => p + 10)}>
        ⭐ 注入更多魔力
        </button>
        <PatronusSpell magicPower={power} />
      </div>
    );
  }