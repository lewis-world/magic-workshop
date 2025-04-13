import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './MagicBook.css';

const LeviosaEffect = () => {
  const particles = useRef([]);
  const containerRef = useRef(null);

  const clear = useCallback(() => {
    particles.current.forEach(p => {
      if (p && p.parentNode) {
        p.parentNode.removeChild(p);
      }
    });
    particles.current = [];
  }, []);

  const activate = useCallback(() => {
    clear();
    
    // 创建20个漂浮粒子
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'leviosa-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      
      if (containerRef.current) {
        containerRef.current.appendChild(particle);
        particles.current.push(particle);
      }
    }
  }, [clear]);  

  useEffect(() => {
    return () => clear(); // 清理效果
  }, [clear]);

  return { activate, containerRef };
};

const MagicBook = ({ title = "高级魔咒指南", wizard = "未注册巫师", basePower = 50 }) => {
  const [spellsCast, setSpellsCast] = useState([]);
  const [owlPosts, setOwlPosts] = useState([]);
  const [currentSpell, setCurrentSpell] = useState(null);
  const scrollContainerRef = useRef(null);
  
  // 使用useMemo优化派生状态
  const spellPower = useMemo(() => basePower * 2, [basePower]);
  
  // 初始化漂浮咒效果
  const { activate, containerRef } = LeviosaEffect();

  // 发送猫头鹰邮件 (useCallback记忆化)
  const sendOwlPost = useCallback(() => {
    const newPost = {
      id: Date.now(),
      content: `魔法报告 ${new Date().toLocaleTimeString()}`,
      status: 'sending'
    };
    
    setOwlPosts(prev => [...prev, newPost]);

    setTimeout(() => {
      setOwlPosts(prev => prev.map(post => 
        post.id === newPost.id ? { ...post, status: 'delivered' } : post
      ));
    }, 2000);
  }, []);

  // 施放咒语
  const castSpell = useCallback((spellName) => {
    setSpellsCast(prev => [...prev, {
      name: spellName,
      timestamp: new Date(),
      power: spellPower
    }]);
    setCurrentSpell(spellName);
  }, [spellPower]);

  // 自动滚动到底部
  const autoScrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 
        scrollContainerRef.current.scrollHeight;
    }
  }, []);

  // 组件挂载时初始化
  useEffect(() => {
    const owlTimer = setInterval(sendOwlPost, 10000);
    castSpell('Lumos'); // 初始咒语
    
    return () => clearInterval(owlTimer); // 清理定时器
  }, [sendOwlPost, castSpell]);

  // 当咒语变化时触发漂浮效果
  useEffect(() => {
    if (currentSpell === 'Wingardium Leviosa') {
      activate();
    }
  }, [currentSpell, activate]);

  // 自动滚动处理 
  useEffect(() => {
    if (scrollContainerRef.current && spellsCast.length > 0) {
      autoScrollToBottom();
    }
  }, [spellsCast.length, autoScrollToBottom]);

  return (
    <div className="magic-book">
      <div className="book-cover">
        <h2>{title}</h2>
        <p>所有者: {wizard}</p>
        <div className="wand-power">
          当前魔力: ⚡{spellPower}%
        </div>
      </div>

      <div className="spell-controls">
        <button onClick={() => castSpell('Lumos')}>荧光闪烁</button>
        <button onClick={() => castSpell('Nox')}>诺克斯</button>
        <button onClick={() => castSpell('Alohomora')}>阿拉霍洞开</button>
        <button onClick={() => castSpell('Wingardium Leviosa')}>漂浮咒</button>
      </div>

      <div 
        ref={scrollContainerRef}
        className="spell-history"
      >
        <h3>咒语记录:</h3>
        <ul>
          {spellsCast.map((spell, index) => (
            <li key={index}>
              <span className="spell-name">{spell.name}</span>
              <span className="spell-time">
                {spell.timestamp.toLocaleTimeString()}
              </span>
              <span className="spell-power">(力量: {spell.power})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="owl-post">
        <h3>猫头鹰邮递:</h3>
        <ul>
          {owlPosts.map(post => (
            <li key={post.id} className={`post-${post.status}`}>
              {post.content} - {post.status === 'sending' ? '🦉发送中' : '✓已送达'}
            </li>
          ))}
        </ul>
      </div>

      <div id="wand-effect-container" ref={containerRef}></div>
    </div>
  );
};

export default MagicBook;