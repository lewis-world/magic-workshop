// 模拟复杂的计算函数
function calculateCreaturePower(creature, level) {
  // 模拟计算耗时 (50-300ms)
  const startTime = performance.now();
  const basePower = {
    unicorn: 80,
    dragon: 120,
    phoenix: 100,
    griffin: 110
  }[creature] || 50;
  
  // 模拟复杂计算
  let power = basePower * (1 + Math.log(level));
  
  // 添加一些随机因素
  power *= 0.9 + Math.random() * 0.2;
  
  // 确保计算至少花费50ms
  while (performance.now() - startTime < 50) {
    // 模拟CPU密集型计算
    for (let i = 0; i < 1000000; i++) {
      power = Math.sqrt(power * 1.0001);
    }
  }
  
  const calculationTime = performance.now() - startTime;
  return { power, calculationTime };
}

// 监听主线程消息
self.onmessage = function(e) {
  const { creature, levelData } = e.data;
  const level = levelData[0]; // 从Transferable数组获取数据
  
  // 执行计算
  const result = calculateCreaturePower(creature, level);
  // 返回结果
  self.postMessage(result);
};