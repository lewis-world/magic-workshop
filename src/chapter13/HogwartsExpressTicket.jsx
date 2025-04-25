import { useState, Suspense, lazy } from 'react';

const TimeTurner = lazy(() => import('./TimeTurner'));
// 预加载魔法
const preloadTimeTurner = () => import('./TimeTurner');

export function HogwartsExpressTicket() {
  const [showTimeTurner, setShowTimeTurner] = useState(false);
  
  return (
    <div className="ticket-card" 
      style={{
        border: '1px solid #d4af37',
        padding: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
        ':hover': {
          transform: 'scale(1.05)'
        }
      }}
      onMouseEnter={preloadTimeTurner}
      onClick={() => setShowTimeTurner(true)}
    >
      <h4>🦉 霍格沃茨特快车票</h4>
      <p>点击查看时间转换器</p>
      
      {showTimeTurner && (
        <Suspense fallback={<div>正在打开时间裂隙...</div>}>
          <TimeTurner />
        </Suspense>
      )}
    </div>
  );
}