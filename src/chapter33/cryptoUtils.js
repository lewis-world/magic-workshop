// 模拟加密函数
export const encrypt = (data) => {
  // 实际项目中应使用Web Crypto API或crypto-js
  return btoa(encodeURIComponent(data));
};

export const decrypt = (data) => {
  try {
    return decodeURIComponent(atob(data));
  } catch {
    return '解密失败 - 咒语已失效';
  }
};

// XSS净化函数
export const sanitizeInput = (input) => {
  return input.replace(/[<>'"&]/g, '');
};