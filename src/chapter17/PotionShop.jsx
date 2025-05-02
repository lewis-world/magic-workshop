import { useState, useEffect } from 'react';

// 魔药数据模拟（代替Supabase）
const mockPotionDB = [
    {
      id: 'p1',
      name: "福灵剂 (Felix Felicis)",
      effect: 'luck',
      stock: 12,
      moonSensitive: true,
      price: 50,
      contraindications: ['不可与酒精混合']
    },
    {
      id: 'p2',
      name: "复方汤剂 (Polyjuice Potion)",
      effect: 'transformation',
      stock: 8,
      moonSensitive: false,
      price: 30,
      contraindications: ['不可连续服用超过12小时']
    }
  ];
  
  // 模拟API请求
  const fetchPotions = () => 
    new Promise(resolve => 
      setTimeout(() => resolve(mockPotionDB), 1500) // 模拟延迟
    );
  
  const updatePotionStock = (id, delta) => {
    mockPotionDB.find(p => p.id === id).stock += delta;
    return Promise.resolve();
  };
  
  // 主组件
  export function PotionShop() {
    const [potions, setPotions] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // 初始化加载
    useEffect(() => {
      fetchPotions().then(data => {
        setPotions(data);
        setLoading(false);
      });
    }, []);
  
    // 魔药库存操作
    const handleBrew = (newPotion) => {
      setPotions(prevPotions => {
        // 查找是否已存在同名魔药
        const existingIndex = prevPotions.findIndex(p => p.name === newPotion.name);
        
        if (existingIndex >= 0) {
          // 合并库存
          const updated = [...prevPotions];
          updated[existingIndex] = {
            ...updated[existingIndex],
            stock: updated[existingIndex].stock + newPotion.stock
          };
          return updated;
        } else {
          // 添加新魔药
          return [...prevPotions, newPotion];
        }
      });
    };
  
    const handleRestock = (id) => {
      updatePotionStock(id, 5).then(() => {
        setPotions(potions.map(p => 
          p.id === id ? { ...p, stock: p.stock + 5 } : p
        ));
      });
    };

    // 删除魔药函数
    const handleDelete = (potionId) => {
      if (window.confirm("确定要销毁这批魔药吗？这将不可挽回！")) {
        setPotions(prev => prev.filter(p => p.id !== potionId));
      }
    };
  
    return (
      <div className="potion-shop">
        <h1>🧪 霍格沃茨魔药专卖店</h1>
        
        {/* 魔药列表 */}
        <div className="potion-shelf">
          {loading ? (
            <div className="spell-loading">正在召唤魔药...</div>
          ) : (
            potions.map(potion => (
              <PotionCard 
                key={potion.id} 
                potion={potion} 
                onRestock={handleRestock}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
  
        {/* 新魔药熬制台 */}
        <PotionBrewingForm onSubmit={handleBrew} />
      </div>
    );
  }
  
  // 魔药名称带图标组件
const PotionName = ({ name, effect }) => {
  const getIcon = () => {
    switch(effect) {
      case 'luck': return '🍀';
      case 'transformation': return '👥';
      case 'healing': return '💊';
      default: return '✨';
    }
  };

  return (
    <h3 className="potion-name">
      <span className="potion-icon">{getIcon()}</span>
      {name}
      <span className="potion-badge">{effect}</span>
    </h3>
  );
};

  // 魔药卡片组件
  const PotionCard = ({ potion, onRestock, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <div className={`potion-card ${potion.moonSensitive ? 'moon-sensitive' : ''}`}>
        <PotionName name={potion.name} effect={potion.effect} />
        <p>💰 价格: {potion.price}加隆</p>
        <p>📦 库存: {potion.stock}瓶</p>

        <button 
          onClick={() => onDelete(potion.id)}
          className="delete-button"
        >
          🗑️ 销毁魔药
        </button>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="spell-button"
        >
          {isExpanded ? '🔍 隐藏详情' : '📜 显示配方'}
        </button>
  
        {isExpanded && (
          <div className="potion-details">
            <p>⚠️ 禁忌: {potion.contraindications.join('，')}</p>
            <button 
              onClick={() => onRestock(potion.id)}
              className="restock-button"
            >
              🧪 补充5瓶
            </button>
          </div>
        )}
      </div>
    );
  };
  
  // 魔药熬制表单
  const PotionBrewingForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
      name: "",
      effect: "",
      price: 0,
      moonSensitive: false,
      stock: 0,
      contraindications: []
    });

    const handleNameChange = (selectedName) => {
      const selectedPotion = POTION_DATA.find(p => p.name === selectedName);
      if (selectedPotion) {
        setFormData({
          ...selectedPotion,
          stock: 0 // 重置库存，让用户输入
        });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const stock = Number(formData.stock);
      if (isNaN(stock) || stock <= 0) {
        alert("请输入有效的库存数量！");
        return;
      }
      onSubmit({
        ...formData,
        stock: stock,
        id: `potion-${Date.now()}`
      });
      setFormData({
        name: "",
        effect: "",
        price: 0,
        moonSensitive: false,
        stock: 0,
        contraindications: []
      });
      
    };

    const POTION_DATA = [
      {
        name: "福灵剂 (Felix Felicis)",
        effect: "luck",
        moonSensitive: true,
        price: 50,
        contraindications: ["不可与酒精混合"],
        stock: 0 // 初始库存为0，由用户输入
      },
      {
        name: "复方汤剂 (Polyjuice Potion)",
        effect: "transformation",
        moonSensitive: false,
        price: 30,
        contraindications: ["不可连续服用超过12小时"],
        stock: 0
      },
      {
        name: "生死水 (Draught of Living Death)",
        effect: "sleep",
        moonSensitive: true,
        price: 80,
        contraindications: ["心脏病患者禁用"],
        stock: 0
      },
      {
        name: "迷情剂 (Amortentia)",
        effect: "love",
        moonSensitive: false,
        price: 45,
        contraindications: ["不可用于强迫他人"],
        stock: 0
      },
      {
        name: "吐真剂 (Veritaserum)",
        effect: "truth",
        moonSensitive: false,
        price: 60,
        contraindications: ["法律审讯需授权"],
        stock: 0
      }
    ];

  
    return (
      <form onSubmit={handleSubmit} className="brewing-form">
      {/* 魔药名称选择 */}
      <div className="form-row">
        <label>
          魔药名称：
          <select 
            value={formData.name} 
            onChange={(e) => handleNameChange(e.target.value)}
            required
          >
            <option value="">选择魔药...</option>
            {POTION_DATA.map(potion => (
              <option key={potion.name} value={potion.name}>{potion.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>效果：<span>{formData.effect || '-'}</span></label>
      </div>
      <div className="form-row">
        <label>价格：<span>{formData.price} 加隆</span></label>
      </div>
      <div className="form-row">
        <label>月相敏感：<span>{formData.moonSensitive ? '是' : '否'}</span></label>
      </div>
      <div className="form-row">
        <label>禁忌：<span>{formData.contraindications.join('，') || '无'}</span></label>
      </div>

      {/* 库存输入 + 按钮 */}
      <div className="form-row">
        <label>
          库存数量：
          <input
            type="number"
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({
              ...formData, 
              stock: Math.max(0, parseInt(e.target.value) || 0)
            })}
            required
          />
        </label>
        
      </div>
      <button type="submit" className="brew-button">开始熬制</button>
    </form>
    );
  };