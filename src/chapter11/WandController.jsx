import { 
    forwardRef, 
    useRef, 
    useImperativeHandle 
  } from 'react';
  
  // 🏺 被控制的魔杖组件
  const WandCore = forwardRef((props, ref) => {
    const coreRef = useRef(null);
  
    // 🔮 只暴露特定方法
    useImperativeHandle(ref, () => ({
      activate: (magicType) => {
        coreRef.current.style.backgroundColor = 
          magicType === '凤凰羽毛' ? '#ffd700' : '#a0a0a0';
        console.log(`激活 ${magicType} 核心`);
      },
      getEnergyLevel: () => {
        return coreRef.current ? 100 : 0;
      }
    }));
  
    return (
      <div 
        ref={coreRef} 
        className="wand-core" 
        style={{ width: 100, height: 20, border: '1px solid #333', margin: '0 auto' }}
      />
    );
  });
  
  // 🧙 控制器组件
  function WandController() {
    const wandRef = useRef(null);
  
    const handleClick = () => {
      wandRef.current?.activate('凤凰羽毛');
      alert(`当前能量: ${wandRef.current?.getEnergyLevel()}%`);
    };
  
    return (
      <div>
        <WandCore ref={wandRef} />
        <button onClick={handleClick}>激活魔杖</button>
      </div>
    );
  }
  
  export default WandController;