let messageCount = 0;

export const sendReplyToServer = async () => {
  // 模拟网络延迟（2-5秒随机）
  await new Promise(resolve => 
    setTimeout(resolve, 2000 + Math.random() * 3000)
  );

  // 20%概率模拟失败
  if (Math.random() < 0.2) {
    throw new Error("遭遇反幻影显形咒！错误代码: 0x7B");
  }

  // 生成魔法回信
  messageCount++;
  return {
    success: true,
    message: `第${messageCount}封回信抵达`,
    timestamp: Date.now(),
    waxSeal: `🖋️${Math.random().toString(36).slice(2, 7)}`
  };
};