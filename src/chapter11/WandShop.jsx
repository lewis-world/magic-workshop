import { useRef, useEffect } from 'react';

function WandShop() {
  const inputRef = useRef(null); // 🖋️ 创建魔杖绑定

  useEffect(() => {
    // 🌟 组件挂载时自动聚焦
    inputRef.current.focus();
    console.log('魔杖已激活:', inputRef.current);
  }, []);

  return (
    <div className="spell-casting">
      <label>咒语输入：</label>
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Expelliarmus..." 
      />
    </div>
  );
}

export default WandShop;