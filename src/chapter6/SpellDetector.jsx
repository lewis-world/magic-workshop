import React, { useEffect } from 'react';
import  useSpellGesture  from './SpellGesture';

export const SpellDetector = () => {
    const currentGesture = useSpellGesture();
  
  useEffect(() => {
    if(currentGesture === 'leviosa') {
      // 触发悬浮效果
      document.body.style.transform = 'translateY(-20px)';
      setTimeout(() => document.body.style.transform = '', 1000);
    }
  }, [currentGesture]);

  return (
    <div style={{ touchAction: 'none', height: '100vh' }}>
      当前手势：{currentGesture}
    </div>
  );
}