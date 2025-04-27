'use client'
import { useState } from 'react';
export default function DefenseInterface() {
    const [casting, setCasting] = useState(false);
    const [spellEffect, setSpellEffect] = useState(null);
  
    const castPatronus = async () => {
      setCasting(true);
      
      // 模拟咒语施法延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSpellEffect({
        message: "🦌 银色牡鹿守护神显现！",
        animation: "patronus-zoom"
      });
      setCasting(false);
    };
  
    return (
      <div className="spell-casting-area">
        <button 
          onClick={castPatronus}
          disabled={casting}
          className={casting ? 'casting-spell' : ''}
          aria-label="施放守护神咒"
        >
          {casting ? '🔄 魔力凝聚中...' : '⚡ 呼神护卫!'}
        </button>
  
        {spellEffect && (
          <div className={`spell-effect ${spellEffect.animation}`}>
            {spellEffect.message}
          </div>
        )}
  
        <div className="wand-motion-tracker">
          <div className="wand" onClick={castPatronus}>✨</div>
          <div className="hint">挥动魔杖触发咒语</div>
        </div>
      </div>
    );
  }