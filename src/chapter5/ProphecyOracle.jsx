import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

// 预言数据生成器
export const ProphecyOracle = ({ children, delay = 1000 }) => {
  const [futureData, setFutureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateProphecy = useCallback(() => ({
    chosenOne: ['哈利', '纳威', '金妮'][Math.floor(Math.random() * 3)],
    prophecyDate: new Date(Date.now() + 365 * 86400000).toISOString(),
    darkMark: Math.random() > 0.5
  }), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (Math.random() < 0.1) throw new Error('时间转换器故障');
        setFutureData(generateProphecy());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, generateProphecy]);

  if (error) return <div>🔮 预言失败: {error}</div>;
  if (loading) return <div>🔮 水晶球正在显现未来...</div>;
  
  return (
    <div className="prophecy-container">
      {typeof children === 'function' ? children(futureData) : children}
    </div>
  );
};

ProphecyOracle.propTypes = {
  children: PropTypes.func.isRequired,
  delay: PropTypes.number
};