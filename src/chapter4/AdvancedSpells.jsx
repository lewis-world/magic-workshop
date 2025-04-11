// ========================
// 🧩 React组件 - AdvancedSpells.jsx
// ========================

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerExplosion, startManaSiphon } from './combos';
import { animateLightning } from './animations';
import { EnemyDisplay } from './EnemyDisplay';
import { CAST_FIREBALL, CAST_LIGHTNING, DAMAGE_ENEMY } from './store';
import './spells.css';

export const AdvancedSpells = () => {
  const dispatch = useDispatch();
  const { mana, comboCount } = useSelector(state => state.spells);
  const [target, setTarget] = useState('dragon');
  const [effects, setEffects] = useState([]);

  const addEffect = (effect) => {
    setEffects(prev => [...prev, effect]);
    setTimeout(() => {
      setEffects(prev => prev.filter(e => e.id !== effect.id));
    }, 1000);
  };

  const fireCombo = () => {
    // 第一次火球
    dispatch(CAST_FIREBALL({manaCost: 30}));
    dispatch(DAMAGE_ENEMY({ id: target, damage: 30 }));
    addEffect({
      id: `fireball-${Date.now()}`,
      type: 'fireball',
      target
    });
    
    // 第二次火球
    setTimeout(() => {
      dispatch(CAST_FIREBALL({manaCost: 30}));
      dispatch(DAMAGE_ENEMY({ id: target, damage: 30 }));
      addEffect({
        id: `fireball-${Date.now()}`,
        type: 'fireball',
        target
      });
      
      // 爆炸效果
      setTimeout(() => {
        dispatch(triggerExplosion(target));
        addEffect({
          id: `explosion-${Date.now()}`,
          type: 'explosion',
          target
        });
      }, 1000);
    }, 500);
  };

  const lightningAttack = () => {
    animateLightning('player-hand', target);
    ['goblin1', 'goblin2', 'goblin3'].forEach((goblin, i) => {
      setTimeout(() => {
        dispatch(CAST_LIGHTNING({manaCost: 20}));
        dispatch(DAMAGE_ENEMY({ id: goblin, damage: 20 }));
        addEffect({
          id: `lightning-${Date.now()}`,
          type: 'lightning',
          target: goblin
        });
      }, i * 200);
    });
  };

  const handleManaSiphon = () => {
    dispatch(startManaSiphon(target));
    addEffect({
      id: `siphon-${Date.now()}`,
      type: 'mana-siphon',
      target
    });
  };

  return (
    <div className="spell-interface">
      <div className="mana-bar">
        ✨ 魔力值: {mana}/100
        <progress value={mana} max="100" />
      </div>
      
      <div className="combo-display">
        连击数: {comboCount}x
        <div className="combo-meter" style={{ width: `${Math.min(comboCount * 20, 100)}%` }} />
      </div>

      <EnemyDisplay />

      {effects.map(effect => (
        <div
          key={effect.id}
          className={effect.type}
          style={{
            left: effect.target === 'dragon' ? '100px' : 
                  effect.target === 'goblin1' ? '200px' :
                  effect.target === 'goblin2' ? '300px' : '400px',
            top: effect.target === 'dragon' ? '100px' : 
                 effect.target === 'goblin1' ? '150px' :
                 effect.target === 'goblin2' ? '200px' : '250px'
          }}
        />
      ))}

      <div className="spell-buttons">
        <button 
          className="fire-combo" 
          onClick={fireCombo}
          disabled={mana < 60}
        >
          🔥 烈焰双击
        </button>

        <button
          className="lightning-chain"
          onClick={lightningAttack}
          disabled={mana < 60}
        >
          ⚡ 闪电链
        </button>

        <button
          className="mana-siphon"
          onClick={handleManaSiphon}
        >
          💧 法力虹吸
        </button>
      </div>
    </div>
  );
};