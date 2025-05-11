import React, { useState, useEffect } from 'react';
import './MagicAcademy.css';

// 模拟异步获取魔法课程
const fetchMagicCourses = () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(['变形术', '魔咒课', '魔药学', '黑魔法防御术']);
    }, 1000);
  });
};

// 魔杖类型
type WandWood = 'yew' | 'holly' | 'oak' | 'willow';

// 坩埚泛型类型
type Cauldron<T extends string> = {
  capacity: number;
  content: T;
};

// 学院徽章类型
type HouseBadge = {
  gryffindor: 'lion';
  slytherin: 'snake';
  hufflepuff: 'badger';
  ravenclaw: 'eagle';
};

// 动态徽章映射类型
type DynamicBadge = {
  [K in keyof HouseBadge as `custom_${K}`]: HouseBadge[K];
};

// 冥想盆记忆递归类型
type Memory = {
  content: string;
  next?: Memory;
};

export default function MagicAcademy() {
  // 使用 useState 和 useEffect 来处理异步数据
  const [courses, setCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchMagicCourses();
        setCourses(data);
      } catch (error) {
        console.error('加载课程失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCourses();
  }, []);
  
  // 状态管理
  const [wand, setWand] = useState<WandWood>('holly');
  const [spellInput, setSpellInput] = useState('');
  const [detectedSpell, setDetectedSpell] = useState('');
  
  // 静态结界示例
  const spells = ['expelliarmus', 'lumos', 'alohomora'] as const;
  
  // 泛型坩埚示例
  const goldenCauldron: Cauldron<'felixFelicis'> = { 
    capacity: 500, 
    content: 'felixFelicis' 
  };
  
  // 动态徽章示例
  const myBadge: DynamicBadge = {
    custom_gryffindor: 'lion',
    custom_slytherin: 'snake',
    custom_hufflepuff: 'badger',
    custom_ravenclaw: 'eagle'
  };
  
  // 递归记忆示例
  const firstMemory: Memory = {
    content: "分院帽的选择",
    next: {
      content: "魁地奇比赛胜利",
      next: {
        content: "三强争霸赛"
      }
    }
  };
  
  // 类型守卫函数
  function isDarkMagic(spell: unknown): spell is 'avadaKedavra' | 'crucio' | 'imperio' {
    return typeof spell === 'string' && 
           ['avadaKedavra', 'crucio', 'imperio'].includes(spell);
  }
  
  // 检测黑魔法动作
  const detectSpell = () => {
    if (isDarkMagic(spellInput)) {
      setDetectedSpell(`检测到不可饶恕咒: ${spellInput}`);
    } else {
      setDetectedSpell('这是普通咒语或未知魔法');
    }
  };
  
  // 自动推断的魔药配方函数
  const brewPotion = (ingredient: string, dose: number) => {
    return `${dose}ml ${ingredient}药剂`;
  };
  
  return (
    <div className="magic-academy">
      <h1>霍格沃茨 TypeScript 魔法学院</h1>
      
      <section className="magic-section">
        <h2>1. 基础魔法课程</h2>
        
        <div className="code-block">
          <h3>魔杖选择</h3>
          <select value={wand} onChange={(e) => setWand(e.target.value as WandWood)}>
            <option value="holly">冬青木</option>
            <option value="yew">紫杉木</option>
            <option value="oak">橡木</option>
            <option value="willow">柳木</option>
          </select>
          <p>当前魔杖: <strong>{wand}</strong></p>
          
          <h3>咒语列表</h3>
          <ul>
            {spells.map((spell, index) => (
              <li key={index}>{spell}</li>
            ))}
          </ul>
          
          <h3>魔药配方</h3>
          <p>{brewPotion('曼德拉草', 100)}</p>
        </div>
      </section>
      
      <section className="magic-section">
        <h2>2. 高级魔法课程</h2>
        
        <div className="code-block">
          <h3>泛型坩埚</h3>
          <p>容量: {goldenCauldron.capacity}ml</p>
          <p>内容物: {goldenCauldron.content}</p>
          
          <h3>黑魔法检测</h3>
          <input 
            type="text" 
            value={spellInput}
            onChange={(e) => setSpellInput(e.target.value)}
            placeholder="输入咒语"
          />
          <button onClick={detectSpell}>检测</button>
          <p className={detectedSpell.includes('不可饶恕咒') ? 'error' : 'success'}>
            {detectedSpell || '等待检测...'}
          </p>
        </div>
      </section>
      
      <section className="magic-section">
        <h2>3. 终极魔法课程</h2>
        
        <div className="code-block">
          <h3>学院徽章</h3>
          <ul>
            {Object.entries(myBadge).map(([key, value]) => (
              <li key={key}>
                {key.replace('custom_', '')}: {value}
              </li>
            ))}
          </ul>
          
          <h3>冥想盆记忆</h3>
          <MemoryViewer memory={firstMemory} />
        </div>
      </section>
      
      <section className="magic-section">
        <h2>4. 魔法实践</h2>
        
        <div className="code-block">
          <h3>本学期课程</h3>
          {loading ? (
            <p>正在加载课程...</p>
          ) : (
            <ul>
              {courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

// 递归记忆查看组件
function MemoryViewer({ memory }: { memory: Memory }) {
  return (
    <div className="memory">
      <p>{memory.content}</p>
      {memory.next && <MemoryViewer memory={memory.next} />}
    </div>
  );
}