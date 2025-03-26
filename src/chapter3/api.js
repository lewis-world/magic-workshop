const forbiddenSpells = [
    { id: 1, name: '阿瓦达索命', level: '不可饶恕咒' },
    { id: 2, name: '钻心剜骨', level: '不可饶恕咒' },
    { id: 3, name: '夺魂咒', level: '不可饶恕咒' }
  ];
  
const fetchForbiddenSpells = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...forbiddenSpells]);
      }, 1500); // 模拟1.5秒网络延迟
    });
  };

export default fetchForbiddenSpells;