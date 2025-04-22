import { 
    useState, 
    useRef, 
    useEffect, 
    useCallback 
  } from 'react';
  
  function SpellScroll() {
    const [spells, setSpells] = useState([
      'Lumos', 'Expelliarmus', 'Wingardium Leviosa'
    ]);
    const scrollContainerRef = useRef(null);
    const inputRef = useRef(null);
  
    // 📜 滚动到底部
    const scrollToBottom = useCallback(() => {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, []);
  
    // ✨ 添加新咒语
    const addSpell = () => {
      const newSpell = inputRef.current.value;
      if (!newSpell) return;
      
      setSpells([...spells, newSpell]);
      inputRef.current.value = '';
    };
  
    // 自动滚动
    useEffect(() => {
      scrollToBottom();
    }, [spells, scrollToBottom]);
  
    return (
      <div className="spell-scroll">
        <div 
          ref={scrollContainerRef}
          style={{ 
            height: 200, 
            overflowY: 'auto', 
            border: '1px solid #ccc',
            padding: 10
          }}
        >
          {spells.map((spell, i) => (
            <div key={i} className="spell-item">
              {spell}
            </div>
          ))}
        </div>
  
        <div className="spell-controls">
          <input 
            ref={inputRef}
            type="text" 
            placeholder="输入新咒语..."
          />
          <button onClick={addSpell}>刻录咒语</button>
        </div>
      </div>
    );
  }
  
  export default SpellScroll;