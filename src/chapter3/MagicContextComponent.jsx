import { useState, createContext, useContext } from 'react'

function SpellBook() {
  const { currentSpell, setCurrentSpell } = useContext(MagicContext);

  const castSpell = (newSpell) => {
    setCurrentSpell(prev => ({
      ...prev,
      ...newSpell
    }));
  };

  return (
    <div className="spell-container">
      <h2>当前咒语：{currentSpell.name}</h2>
      <button onClick={() => castSpell({ name: "盔甲护身", type: "防御术" })}>
        切换防御咒语
      </button>
    </div>
  );
}

// 定义魔法类型与默认值
const defaultSpell = {
  name: "荧光闪烁",
  power: 100,
  type: "照明术"
};

const MagicContext = createContext(defaultSpell); // 设置默认值

function MagicContextComponent() {
  const [currentSpell, setCurrentSpell] = useState(defaultSpell);
  
  return (
    <MagicContext.Provider value={{ currentSpell, setCurrentSpell }}>
      <SpellBook />
    </MagicContext.Provider>
  );
}

export default MagicContextComponent