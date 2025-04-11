import React from 'react';
import { useSelector } from 'react-redux';
import './spells.css';

export const EnemyDisplay = () => {
  const enemies = useSelector(state => state.enemies);

  return (
    <div className="enemy-container">
      {enemies.map(enemy => (
        <div 
          key={enemy.id} 
          className="enemy"
          style={{
            left: enemy.position.x,
            top: enemy.position.y
          }}
        >
          <div className="enemy-sprite">
            {enemy.id === 'dragon' ? '🐉' : '👺'}
          </div>
          <div className="enemy-hp-bar">
            <div 
              className="enemy-hp-fill"
              style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
            />
          </div>
          <div className="enemy-hp-text">{enemy.hp}/{enemy.maxHp}</div>
        </div>
      ))}
    </div>
  );
}; 