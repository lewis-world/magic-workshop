
// 🕹️ 组合技中间件

export const comboMiddleware = (store) => (next) => (action) => {
  console.log(`Middleware received action: ${action.type}`); // 添加日志
  if (action.type === 'CAST_FIREBALL') {
    const lastCast = store.getState().lastFireCast || 0;
    const now = Date.now();
    
    // 检测连击
    if (now - lastCast < 500) {
      store.dispatch({ type: 'COMBO_INCREASE' });
    }
    
    next({ ...action, meta: { castTime: now } });
  } else {
    next(action);
  }
};
