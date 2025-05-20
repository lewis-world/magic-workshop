import { encrypt } from './cryptoUtils';
// 模拟API服务
const users = {
  wizard: { 
    id: 1, 
    name: '哈利·波特', 
    role: 'student',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.1' 
  }
};

const spells = [
  {
    id: 1,
    name: '护盾咒',
    description: '创造魔法屏障抵御攻击',
    power: 85
  },
  {
    id: 2,
    name: '反咒',
    description: '反弹敌方法术',
    power: 90
  },
  {
    id: 3,
    name: '隐身术',
    description: '使目标暂时隐形',
    power: 75
  }
];

// 模拟登录
export const login = async (username, password) => {
  await delay(800);
  const user = users[username];
  if (!user || password !== 'magic123') {
    throw new Error('认证失败 - 用户名或咒语错误');
  }
  return user;
};

// 获取法术列表
export const fetchSpells = async (token) => {
  await delay(600);
  if (!token) throw new Error('需要灵魂绑定令牌');
  return spells.map(spell => ({
    ...spell,
    description: encrypt(spell.description) // 模拟加密传输
  }));
};

// 施放法术
export const castSpell = async (spellId, csrfToken, userToken) => {
  await delay(500);
  if (!csrfToken) throw new Error('缺少CSRF防护令牌');
  if (!userToken) throw new Error('未认证的施法尝试');
  
  const spell = spells.find(s => s.id === spellId);
  if (!spell) throw new Error('法术不存在');
  
  return { success: true, spell };
};

// 模拟延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));