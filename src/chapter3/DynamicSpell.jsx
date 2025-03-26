import { memo, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 模拟咒语能量计算（可能需要复杂计算）
const calculatePower = (spell) => {
  // 添加错误处理边界
  if (!spell?.type) throw new Error('无效的咒语格式');
  
  // 模拟复杂计算
  return spell.incantation.length * (spell.difficulty || 1);
};

// 动态颜色映射
const POWER_COLORS = {
  0: 'gray',
  1: '#4CAF50',
  2: '#FFC107',
  3: '#F44336',
  4: '#9C27B0'
};

function DynamicSpell({ spell }) {
  const [computedPower, setComputedPower] = useState(0);
  const [error, setError] = useState(null);

  // 使用 useMemo 缓存计算结果
  const powerLevel = useMemo(() => {
    try {
      const basePower = calculatePower(spell);
      return Math.min(Math.floor(basePower / 10), 4);
    } catch (err) {
      setError(err.message);
      return 0;
    }
  }, [spell]);

  // 动态颜色过渡动画
  useEffect(() => {
    const animation = setComputedPower(p => {
      const diff = powerLevel - p;
      return diff > 0 ? p + 1 : powerLevel;
    });
    
    return () => clearInterval(animation);
  }, [powerLevel]);

  if (error) {
    return (
      <div className="spell-error">
        ⚡ 咒语解析失败: {error}
      </div>
    );
  }

  return (
    <div 
      className="spell-card"
      style={{
        background: POWER_COLORS[computedPower],
        animation: `${computedPower > 2 ? 'dark-pulse' : 'light-glow'} 1s infinite`
      }}
    >
      <span className="power-level">{computedPower}级咒语</span>
      <div className="spell-details">
        <h3>{spell.name}</h3>
        <p>类型: {spell.type}</p>
      </div>
    </div>
  );
}

// 使用 React.memo 优化渲染
export default memo(DynamicSpell, (prev, next) => {
  return prev.spell.id === next.spell.id;
});

// 类型检查
DynamicSpell.propTypes = {
  spell: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.oneOf(['攻击', '防御', '治疗']),
    incantation: PropTypes.string.isRequired,
    difficulty: PropTypes.number
  }).isRequired
};
