import React from 'react';
// ============= 魔法核心库 =============
const HogwartsRBAC = {
  // 星轨数据库
  roleSpellMap: new Map([
    ['Gryffindor', ['Incendio', 'Expecto Patronum']],
    ['Slytherin', ['Sectumsempra', 'Legilimens']],
    ['Ravenclaw', ['Obliviate', 'Alohomora']],
    ['Hufflepuff', ['Herbivicus', 'Lumos Maxima']]
  ]),
  currentWizard: null,

  // 猫头鹰邮递服务
  async owlPost(operation, ...args) {
    console.log(`🦉 猫头鹰携带【${operation}】请求起飞...`);
    await new Promise(resolve => 
      setTimeout(resolve, 500 + Math.random() * 1000)
    );
    
    if (!this[operation]) {
      throw new Error(`未知的魔法协议: ${operation}`);
    }
    
    const result = await this[operation](...args);
    console.log('📜 猫头鹰带回响应:', result);
    return result;
  },

  // 分院仪式
  async performSorting(name, bloodType) {
    const houses = Array.from(this.roleSpellMap.keys());
    this.currentWizard = {
      id: `wizard-${Date.now()}`,
      name,
      house: houses[Math.floor(Math.random() * houses.length)],
      bloodType,
      sortedAt: new Date().toLocaleTimeString()
    };
    return this.currentWizard;
  }
};

// ============= 活点地图组件 =============
export function MaraudersMap() {
  const [wizard, setWizard] = React.useState(null);
  const [spells, setSpells] = React.useState([]);
  const [status, setStatus] = React.useState({
    text: '魔杖准备就绪...',
    isWorking: false
  });

  // 分院仪式 (修复无响应问题)
  const initiateSorting = async () => {
    if (status.isWorking) return;
    
    setStatus({
      text: '分院帽正在深度思考... 🎩',
      isWorking: true
    });
    
    try {
      const sortedWizard = await HogwartsRBAC.owlPost(
        'performSorting', 
        '哈利·波特', 
        '混血'
      );
      
      setWizard(sortedWizard);
      const houseSpells = HogwartsRBAC.roleSpellMap.get(sortedWizard.house) || [];
      
      setStatus({
        text: `分院完成！欢迎加入 ${sortedWizard.house}`,
        isWorking: false
      });
      
      setSpells(houseSpells);
    } catch (error) {
      console.error('🛑 魔法异常:', error);
      setStatus({
        text: `分院失败: ${error.message}`,
        isWorking: false
      });
    }
  };

  // 施法验证
  const attemptSpell = (spell) => {
    const hasPermission = spells.includes(spell);
    alert(hasPermission 
      ? `🌟 成功施放 ${spell}！` 
      : '⛔ 无权限施放此咒语'
    );
  };

  return (
    <div className="magic-academy">
      <div className="header">
        <h1>
          <span className="icon">⚡</span>
          霍格沃茨分院仪式
        </h1>
        <div className="status-box">
          {status.text}
          {status.isWorking && <span className="spinner">🌀</span>}
        </div>
      </div>

      {!wizard ? (
        <button
          onClick={initiateSorting}
          disabled={status.isWorking}
          className={`sort-btn ${status.isWorking ? 'working' : ''}`}
        >
          {status.isWorking ? (
            <>
              <span className="spinner">⏳</span>
              魔法进行中...
            </>
          ) : (
            '开始分院仪式'
          )}
        </button>
      ) : (
        <div className="wizard-dossier">
          <h2>
            <span className="icon">🧙‍♂️</span>
            {wizard.name}
          </h2>
          <div className="house-banner">
            🏰 {wizard.house} · {wizard.bloodType}
          </div>
          
          <div className="spell-manual">
            <h3>
              <span className="icon">📜</span>
              学院专属咒语
            </h3>
            {spells.length > 0 ? (
              <ul>
                {spells.map(spell => (
                  <li key={spell}>
                    <button 
                      onClick={() => attemptSpell(spell)}
                      className="spell-btn"
                    >
                      <span className="spell-icon">✨</span>
                      {spell}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">⚠️ 未发现任何咒语记录</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}