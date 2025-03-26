const mockDB = {
    items: [
      { id: 1, name: "隐身斗篷", price: 999 },
      { id: 2, name: "时间转换器", price: 1500 }
    ]
  }
  
  export const fetchItems = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { data: mockDB.items };
  };
  
  export const addItem = async (item) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newItem = { ...item, id: Date.now() };
    mockDB.items.push(newItem);
    return { success: true, item: newItem };
  };