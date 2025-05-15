// 模拟API请求
export const mockApi = {
  fetchItems: () => new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 1, name: '福灵剂', stock: 5, price: 50 },
      { id: 2, name: '隐身斗篷', stock: 3, price: 200 }
    ]), 800);
  }),
  purchase: (id) => new Promise(resolve => {
    setTimeout(() => resolve({ success: true, id }), 500);
  })
};