import React, { useRef, useEffect, useState } from 'react';
import './DarkArtsLab.css';
const DarkArtsLab = () => {
  // 💀 魂器引用
  const horcrux = useRef({
    spells: [],
    soulFragment: null,
    addDarkSpell: (spell) => {
      horcrux.current.spells.push(spell);
      console.log(`咒语"${spell}"已存入魂器`);
    },
    splitSoul: (fragment) => {
      horcrux.current.soulFragment = fragment;
      console.warn('⚠️ 警告：你制造了魂器！魔法部已收到警报');
    },
    destroy: () => {
      horcrux.current.spells = [];
      horcrux.current.soulFragment = null;
      console.log('魂器已被摧毁');
    }
  });

  // 🪄 组件状态
  const [spell, setSpell] = useState('');
  const [soulFragment, setSoulFragment] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [darkSpells, setDarkSpells] = useState([]);

  // 🧹 清理副作用
  useEffect(() => {
    const currentHorcrux = horcrux.current;
    return () => {
        currentHorcrux.destroy();
    };
  }, []);

  // ⚡ 施放黑魔法
  const castDarkSpell = () => {
    if (!spell.trim()) return;
    
    horcrux.current.addDarkSpell(spell);
    setDarkSpells([...horcrux.current.spells]);
    setSpell('');
    
    if (spell.toLowerCase().includes('avada kedavra')) {
      setShowWarning(true);
    }
  };

  // 🔪 分裂灵魂
  const splitSoul = () => {
    if (!soulFragment.trim()) return;
    horcrux.current.splitSoul(soulFragment);
    setSoulFragment('');
  };

  // 💥 摧毁魂器
  const destroyHorcrux = () => {
    horcrux.current.destroy();
    setDarkSpells([]);
    setShowWarning(false);
  };

  return (
    <div className="dark-arts-lab">
      <h2>黑魔法实验室</h2>
      
      {showWarning && (
        <div className="ministry-warning">
          ⚠️ 魔法部警告：检测到不可饶恕咒！
        </div>
      )}

      <div className="spell-section">
        <h3>黑魔法咒语存储</h3>
        <input
          type="text"
          value={spell}
          onChange={(e) => setSpell(e.target.value)}
          placeholder="输入黑魔法咒语"
        />
        <button onClick={castDarkSpell}>存入魂器</button>
        
        {darkSpells.length > 0 && (
          <div className="spell-list">
            <h4>已存储咒语:</h4>
            <ul>
              {darkSpells.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="horcrux-section">
        <h3>魂器操作</h3>
        <input
          type="text"
          value={soulFragment}
          onChange={(e) => setSoulFragment(e.target.value)}
          placeholder="灵魂碎片名称"
        />
        <button 
          onClick={splitSoul}
          className="danger-button"
        >
          分裂灵魂
        </button>
        
        {horcrux.current.soulFragment && (
          <p>当前灵魂碎片: {horcrux.current.soulFragment}</p>
        )}
      </div>

      <div className="defense-tip">
        <p>提示：使用魂器会永久损害你的灵魂</p>
        <button 
          onClick={destroyHorcrux}
          className="defense-button"
        >
          摧毁魂器
        </button>
      </div>
    </div>
  );
};

export default DarkArtsLab;