import React, { useState, useEffect, useCallback } from 'react';
import './MagicShield.css';

// 模拟天文台监控系统
const Observatory = {
  recordError: (error, info) => {
    console.error('🔮 [天文台记录] 错误:', error, '信息:', info);
  },
  sendErrorLog: (digest) => {
    console.log('📡 [天文台发送] 错误摘要:', digest);
  },
  reportLatency: (metrics) => {
    console.warn('⏱️ [天文台报告] 性能延迟:', metrics);
  }
};

// 自定义错误边界钩子
function useErrorBoundary() {
  const [error, setError] = useState(null);

  const handleError = useCallback((error, errorInfo) => {
    setError(error);
    Observatory.recordError(error, errorInfo);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, resetError };
}

// 模拟会出错的魔法组件
const UnstableSpell = ({ shouldFail, onError, resetCount }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      try {
        if (!mounted) return;
        
        if (shouldFail) {
          throw new Error('魔法能量不稳定导致施法失败！');
        }
        setData('✨ 魔法施放成功！');
        setLocalError(null);
        setLoading(false);
      } catch (error) {
        setLocalError(error);
        onError(error, { componentStack: 'UnstableSpell' });
        setLoading(false);
      }
    }, 1000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [shouldFail, resetCount, onError]);

  if (loading) {
    return <div className="loading">正在施展魔法...</div>;
  }

  return localError ? null : <div className="success">{data}</div>;
};

// 主应用组件
const MagicShield = () => {
  const [shouldFail, setShouldFail] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const { error, handleError, resetError } = useErrorBoundary();

  const resetSpell = useCallback(() => {
    resetError();
    setResetCount(prev => prev + 1);
  }, [resetError]);

  return (
    <div className="magic-shield">
      <h1>霍格沃茨魔法护盾系统</h1>
      <p>演示错误边界和监控系统的魔法实现</p>
      
      <div style={{ margin: '1rem 0' }}>
        <label>
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={() => setShouldFail(!shouldFail)}
          />
          让魔法失败
        </label>
      </div>

      {error ? (
        <div className="error-boundary">
          <div className="error-message">⚠️ 咒语失效: {error.message}</div>
          <button className="magic-button" onClick={(resetSpell)}>
            重新施法
          </button>
        </div>
      ) : (
        <UnstableSpell 
          shouldFail={shouldFail} 
          onError={handleError}
          resetCount={resetCount}
        />
      )}

      <PerformanceSentinel />
    </div>
  );
};

// 性能监控组件
const PerformanceSentinel = () => {
  useEffect(() => {
    const measurePerformance = () => {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        console.log('⏱️ 页面加载性能:', {
          DOM加载: navEntry.domComplete,
          完整加载: navEntry.loadEventEnd
        });

        if (navEntry.domComplete > 1000) {
          Observatory.reportLatency(navEntry);
        }
      }
    };

    const timer = setTimeout(measurePerformance, 500);
    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default MagicShield;