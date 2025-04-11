import { motion, useAnimation, AnimatePresence } from "framer-motion";
import React, { useState } from 'react';
// 守护神路径动画配置
const patronusPath = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    scale: 0.5
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// 粒子特效组件
const ParticleEffect = ({ isActive }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="magic-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: [0.5, 1, 0],
              opacity: [1, 0.5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

// 主组件实现
export const PatronusButton = ({ onActivate, children, className }) => {
  const [isEffectActive, setIsEffectActive] = useState(false);
  const controls = useAnimation();
  
  const triggerAnimation = async () => {
    await controls.start("visible");
    onActivate("守护神已出发"); // 触发父组件回调
    setIsEffectActive(true);
  };

  return (
    <motion.div 
      className="patronus-container ${className}"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={triggerAnimation}
    >
      <ParticleEffect isActive={isEffectActive} />
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        initial="hidden"
        animate={controls}
        variants={patronusPath}
      >
        <ellipse
          cx="100" // 椭圆中心的 x 坐标
          cy="100" // 椭圆中心的 y 坐标
          rx="90"  // 椭圆的水平半径
          ry="50"  // 椭圆的垂直半径
          fill="none"
          stroke="#61dafb"
          strokeWidth="4"
        />
      </motion.svg>
      <div className="button-text">
        {children}
      </div>
    </motion.div>
  );
};