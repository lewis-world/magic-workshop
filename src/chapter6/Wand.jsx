import { useState, useEffect, useCallback } from 'react';

export const Wand = () => {
  const [spell, castSpell] = useState('Lumos');
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  // 使用useCallback优化事件处理
  const handleTouchStart = useCallback((e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const deltaX = e.changedTouches[0].clientX - touchStart.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.y;
    
    // 滑动方向判断
    if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY)) {
      castSpell(prev => 
        deltaX > 0 ? 'Expecto Patronum' : 'Lumos'
      );
    }
  }, [touchStart.x, touchStart.y]); // 正确声明依赖

  useEffect(() => {
    // 使用局部元素监听
    const wandElement = document.getElementById('wand-core');
    
    wandElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    wandElement.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      wandElement.removeEventListener('touchstart', handleTouchStart);
      wandElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]); // 依赖稳定函数

  return (
    <div id="wand-core" className="wand-container">
      当前法术: {spell}
    </div>
  );
};