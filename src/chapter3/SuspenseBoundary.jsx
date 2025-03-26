import { Suspense } from 'react';

function SuspenseBoundary({ children }) {
    return (
      <div className="dark-arts-container">
        <h2>🕳️ 黑魔法禁术名录</h2>
        <Suspense fallback={<LoadingCauldron />}>
          {children}
        </Suspense>
      </div>
    );
  }
  
  // 3. 加载状态组件
function LoadingCauldron() {
    return (
      <div className="loading">
        <div className="bubbling-cauldron">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <p>正在召唤禁术列表...</p>
      </div>
    );
  }

  export default SuspenseBoundary;