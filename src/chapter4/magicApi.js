const mockDatabase = [];
let requestCount = 0;

export const submitPost = async (post) => {
  // 模拟网络延迟（1-3秒随机）
  await new Promise(resolve => 
    setTimeout(resolve, 1000 + Math.random() * 2000)
  );
  
  // 30%概率模拟失败
  requestCount++;
  if (requestCount % 3 === 0) {
    throw new Error("猫头鹰遭遇摄魂怪袭击，请重试！");
  }

  // 生成正式ID（替换临时ID）
  const serverPost = {
    ...post,
    id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now()
  };
  
  mockDatabase.push(serverPost);
  return { 
    ok: true,
    id: serverPost.id,
    // 模拟服务器响应数据
    data: { 
      ...serverPost,
      author: "魔法部认证用户",
      likes: Math.floor(Math.random() * 100)
    }
  };
};