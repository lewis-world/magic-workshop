import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// 基础猫头鹰组件
const BaseOwl = ({ color, size = 'medium', children }) => (
  <div 
    className={`owl-base ${size}`}
    style={{ 
      color,
      padding: size === 'large' ? '2rem' : '1rem',
      transition: 'all 0.3s ease'
    }}
  >
    🦉 {children}
  </div>
);

BaseOwl.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node
};

// 动态属性增强组件
export const DynamicOwl = (props) => {
  const dynamicProps = useMemo(() => ({
    ...props,
    color: props.isUrgent ? 'red' : 'brown',
    size: props.isImportant ? 'large' : 'medium'
  }), [props.isUrgent, props.isImportant]);

  return <BaseOwl {...dynamicProps} />;
};

DynamicOwl.propTypes = {
  isUrgent: PropTypes.bool,
  isImportant: PropTypes.bool,
  children: PropTypes.node
};

DynamicOwl.defaultProps = {
  isUrgent: false,
  isImportant: false
};