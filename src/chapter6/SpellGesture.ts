import { useState, useRef, useCallback, useEffect } from 'react';

type SpellGesture = 'leviosa' | 'expelliarmus' | 'unknown';

export const useSpellGesture = () => {
  const [gesture, setGesture] = useState<SpellGesture>('unknown');
  const trajectoryRef = useRef<number[][]>([]);
  const startPosRef = useRef<{x: number, y: number}>({x: 0, y: 0});

  // 手势检测逻辑
  const detectGesture = (points: number[][]) => {
    if (points.length < 5) return 'unknown';
    
    // 计算起始点与终点的向量差
    const deltaX = points[points.length-1][0] - points[0][0];
    const deltaY = points[points.length-1][1] - points[0][1];
    
    // 手势判断规则
    if (Math.abs(deltaY) > 100 && Math.abs(deltaY/deltaX) > 2) {
      return deltaY > 0 ? 'expelliarmus' : 'leviosa';
    }
    
    return 'unknown';
  };

  // 触摸事件处理
  const handleTouchStart = useCallback((e: TouchEvent) => {
    startPosRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const newPoint = [
      e.touches[0].clientX - startPosRef.current.x,
      e.touches[0].clientY - startPosRef.current.y,
      Date.now()
    ];
    
    // 轨迹管理（保留最近20个点）
    trajectoryRef.current = [...trajectoryRef.current.slice(-19), newPoint];
    
    // 实时检测手势
    const detected = detectGesture(trajectoryRef.current);
    if (detected !== 'unknown') {
      setGesture(detected);
      trajectoryRef.current = []; // 重置轨迹
    }
  }, []);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleTouchStart, handleTouchMove]);

  return gesture;
};

export default useSpellGesture;