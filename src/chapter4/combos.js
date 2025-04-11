// ========================
// 🎮 组合技实现 - combos.js
// ========================

export const triggerExplosion = (target) => (dispatch, getState) => {
    // 爆炸视觉效果
    dispatch({
      type: 'SHOW_EXPLOSION',
      payload: {
        id: `explosion-${Date.now()}`,
        target,
        radius: 100
      }
    });
  
    // 伤害计算（300ms后执行）
    setTimeout(() => {
      const { enemies } = getState();
      const center = enemies.find(e => e.id === target)?.position;
      
      if (center) {
        enemies.forEach(enemy => {
          const distance = Math.hypot(
            enemy.position.x - center.x,
            enemy.position.y - center.y
          );
          
          if (distance <= 100) {
            const damage = Math.floor(100 - distance);
            dispatch({
              type: 'DAMAGE_ENEMY',
              payload: { id: enemy.id, damage }
            });
          }
        });
      }
    }, 300);
  };
  
  export const startManaSiphon = (target) => (dispatch) => {
    const interval = setInterval(() => {
      dispatch({ type: 'spells/RESTORE_MANA', payload: 10 });
    }, 1000);
  
    dispatch({
      type: 'START_MANA_SIPHON',
      payload: { target, interval }
    });
  
    // 5秒后自动停止
    setTimeout(() => {
      clearInterval(interval);
      dispatch({ type: 'STOP_MANA_SIPHON' });
    }, 5000);
  };