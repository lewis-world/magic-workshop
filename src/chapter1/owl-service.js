import './styles.css'
const mockSubscribers = new Set();

export const sendOwl = async (email) => {
  // 模拟网络延迟（1-3秒随机）
  await new Promise(resolve => 
    setTimeout(resolve, 1000 + Math.random() * 2000)
  );

  // 数据验证
  if (!/@wizarding\.world$/.test(email)) {
    return { 
      error: "必须使用魔法部认证的猫头鹰邮箱 (@wizarding.world)" 
    };
  }

  // 模拟服务器响应
  if (Math.random() < 0.2) {
    return { error: "猫头鹰遭遇摄魂怪袭击，请重试" };
  }

  // 模拟重复订阅
  if (mockSubscribers.has(email)) {
    return { error: "该邮箱已被列入凤凰社通讯录" };
  }

  mockSubscribers.add(email);
  return { success: true };
};

export default sendOwl;