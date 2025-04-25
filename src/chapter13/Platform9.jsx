import React, { Suspense } from 'react';

const TimeTurner = React.lazy(() => import('./TimeTurner'));

export function Platform9() {
  return (
    <div className="platform-container" style={{
      position: 'relative',
      minHeight: '300px',
      border: '3px dashed #9c3587',
      padding: '2rem'      
    }}>
      <Suspense fallback={
        <div className="loading-platform" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}>
          <div className="brick-wall-animation">🧱🚪🧱</div>
          <p>正在连接九又四分之三站台...</p>
          <div className="progress-bar" style={{
            width: '80%',
            height: '8px',
            backgroundColor: '#e0e0e0',
            marginTop: '1rem'
          }}>
            <div className="progress" style={{
              width: '10%',
              height: '100%',
              backgroundColor: '#9c3587',
              animation: 'pulse 1.5s infinite'
            }}></div>
          </div>
        </div>
      }>
        <TimeTurner />
      </Suspense>
    </div>
  );
}