import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, useInView } from 'framer-motion';

// 独立CSS样式
const styles = `
  .magic-academy {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1e1e2f 0%, #2d2d42 100%);
    font-family: 'Segoe UI', sans-serif;
    overflow: hidden;
  }

  .spell-card {
    position: relative;
    width: 300px;
    padding: 30px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    cursor: grab;
    overflow: hidden;
    color: white;
  }

  .spell-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .spell-content {
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .spell-button {
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    background: linear-gradient(90deg, #8a2be2 0%, #ff69b4 100%);
    color: white;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .spell-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(138, 43, 226, 0.4);
  }

  .magic-circle {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(138,43,226,0.8) 0%, rgba(0,0,0,0) 70%);
    pointer-events: none;
  }

  .sparkle {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
    pointer-events: none;
  }
`;

const MagicCard = () => {
  // 1. 手势交互状态
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const controls = useAnimation();

  // 2. 视口检测
  const ref = useRef(null);

  // 3. 循环动画状态
  const [spellActive, setSpellActive] = useState(false);

  // 4. 生成魔法粒子
  const sparkles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }));

  // 5. 触发魔法效果
  const castSpell = async () => {
    setSpellActive(true);
    
    // 模拟服务器请求
    await new Promise(resolve => setTimeout(resolve, 800));
    
    await controls.start({
      scale: [1, 1.1, 1],
      boxShadow: [
        '0 10px 30px rgba(0,0,0,0.3)',
        '0 10px 40px rgba(138,43,226,0.5)',
        '0 10px 30px rgba(0,0,0,0.3)'
      ],
      transition: { duration: 1.5 }
    });
    
    setSpellActive(false);
  };

  return (
    <div className="magic-academy">
      <style>{styles}</style>
      
      <motion.div 
        ref={ref}
        className="spell-card"
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.1}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {/* 魔法粒子效果 */}
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              opacity: spellActive ? 1 : 0.3
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
              transition: {
                duration: 2,
                repeat: Infinity,
                delay: sparkle.delay
              }
            }}
          />
        ))}

        {/* 魔法光环 */}
        <motion.div 
          className="magic-circle"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 30, -30, 0],
            scale: spellActive ? [1, 1.5, 1] : 1,
            opacity: spellActive ? [0.5, 0.8, 0.5] : 0.3,
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        <h2 className="spell-title">魔法卡牌</h2>
        <p className="spell-content">
          {spellActive 
            ? "咒语释放中..." 
            : "拖动卡牌左右移动，点击按钮释放魔法能量"}
        </p>
        
        <motion.button
          className="spell-button"
          onClick={castSpell}
          disabled={spellActive}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: spellActive 
                ? ['#8a2be2', '#ff69b4', '#8a2be2'] 
                : '#8a2be2',
            transition: { duration: 2, repeat: Infinity }
          }}
        >
          {spellActive ? "施法中..." : "释放咒语"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MagicCard;