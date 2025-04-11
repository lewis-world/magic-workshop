// ========================
// 🎬 动画系统 - animations.js
// ========================

export const animateLightning = (from, to) => {
    const fromElem = document.querySelector(`#${from}`);
    const toElem = document.querySelector(`#${to}`);
    if (!fromElem || !toElem) return;
  
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    document.body.appendChild(lightning);
  
    // 计算闪电路径
    const fromRect = fromElem.getBoundingClientRect();
    const toRect = toElem.getBoundingClientRect();
    const angle = Math.atan2(
      toRect.top - fromRect.top,
      toRect.left - fromRect.left
    );
    const length = Math.hypot(
      toRect.left - fromRect.left,
      toRect.top - fromRect.top
    );
  
    // 设置动画属性
    lightning.style.cssText = `
      --angle: ${angle}rad;
      --length: ${length}px;
      left: ${fromRect.left}px;
      top: ${fromRect.top}px;
    `;
  
    // 执行动画
    lightning.animate([
      { transform: 'scaleX(0)', opacity: 1 },
      { transform: 'scaleX(1)', opacity: 0.8 },
      { transform: 'scaleX(0)', opacity: 0 }
    ], {
      duration: 300,
      easing: 'ease-out'
    }).onfinish = () => lightning.remove();
  };