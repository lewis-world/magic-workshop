const cache = new Map();

export const unstable_cache = (fn, key, { revalidate } = {}) => {
  return async () => {
    // 如果有缓存且未过期
    if (cache.has(key) && Date.now() - cache.get(key).timestamp < revalidate * 1000) {
      return cache.get(key).data;
    }

    // 否则获取新数据
    const data = await fn();
    cache.set(key, { 
      data, 
      timestamp: Date.now() 
    });
    return data;
  };
};