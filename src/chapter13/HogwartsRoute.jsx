import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

// 有求必应屋组件
const RoomOfRequirement = React.lazy(() => import('./RoomOfRequirement'));

// 消失柜加载组件
const VanishingCabinetLoader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    background: '#1a1a2e',
    color: '#d4af37',
    fontFamily: 'cursive'
  }}>
    <div style={{
      fontSize: '3rem',
      animation: 'float 2s ease-in-out infinite',
      filter: 'drop-shadow(0 0 8px #d4af37)'
    }}>🧳</div>
    <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
      消失柜正在传送物品...
    </p>
  </div>
);

// 完整路由配置
const HogwartsRoute = () => {
    return (
      <Router>      
        <Suspense fallback={<VanishingCabinetLoader />}>
          <Routes>
            <Route 
              path="/room-of-requirement" 
              element={<RoomOfRequirement />} 
            />
            <Route 
              path="/" 
              element={<Navigate to="/room-of-requirement" replace />} 
            />
          </Routes>
        </Suspense>
    </Router>
    );
  };

export default HogwartsRoute;