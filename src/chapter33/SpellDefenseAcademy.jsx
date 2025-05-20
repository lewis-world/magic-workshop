import { useState } from 'react';
import { encrypt, decrypt } from './cryptoUtils';
import { login, fetchSpells, castSpell } from './apiService';
import './spellDefense.css';

export default function SpellDefenseAcademy() {
  const [user, setUser] = useState(null);
  const [spells, setSpells] = useState([]);
  const [input, setInput] = useState('');
  const [defenseLog, setDefenseLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 生物认证模拟
  const biometricAuth = async () => {
    try {
      setIsLoading(true);
      // 模拟WebAuthn生物认证
      await new Promise(resolve => setTimeout(resolve, 1000));
      const authUser = await login('wizard', 'magic123');
      setUser(authUser);
      addLog('🔐 生物认证成功！灵魂已绑定');
    } catch (error) {
      addLog(`❌ 认证失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取防御法术列表
  const loadSpells = async () => {
    try {
      setIsLoading(true);
      const encryptedSpells = await fetchSpells(user.token);
      setSpells(encryptedSpells);
      addLog('📜 法术卷轴解密完成');
    } catch (error) {
      addLog(`❌ 获取法术失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 施放防御法术
  const castDefenseSpell = async (spellId) => {
    try {
      setIsLoading(true);
      const spell = spells.find(s => s.id === spellId);
      if (!spell) throw new Error('法术不存在');
      
      // CSRF防护演示
      const csrfToken = crypto.randomUUID();
      await castSpell(spellId, csrfToken, user.token);
      
      addLog(`🛡️ 施放 ${spell.name} 成功！结界已展开`);
    } catch (error) {
      addLog(`💥 法术失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // XSS防护演示
  const handleInput = (value) => {
    // 过滤危险字符
    const sanitized = value.replace(/[<>]/g, '');
    setInput(sanitized);
    if (sanitized !== value) {
      addLog('⚠️ 检测到危险字符，已自动净化！');
    }
  };

  // 添加防御日志
  const addLog = (message) => {
    setDefenseLog(prev => [
      { 
        id: Date.now(), 
        message,
        time: new Date().toLocaleTimeString() 
      },
      ...prev.slice(0, 9)
    ]);
  };

  // 加密演示数据
  const encryptedData = encrypt('秘密咒语: 呼神护卫');
  const decryptedData = user ? decrypt(encryptedData) : '***';

  return (
    <div className="spell-academy">
      <header className="academy-header">
        <h1>霍格沃茨魔法防御术学院</h1>
        <div className="user-status">
          {user ? (
            <span className="wizard">👨‍🎓 {user.name} 法师</span>
          ) : (
            <button 
              onClick={biometricAuth}
              disabled={isLoading}
            >
              {isLoading ? '正在施展认证咒语...' : '灵魂绑定认证'}
            </button>
          )}
        </div>
      </header>

      <div className="spell-container">
        <section className="spell-controls">
          <h2>防御法术控制台</h2>
          <div className="input-group">
            <label>咒语测试 (XSS防护):</label>
            <input
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="输入测试咒语..."
            />
          </div>
          
          <div className="data-demo">
            <p>加密演示: {encryptedData}</p>
            <p>解密演示: {decryptedData}</p>
          </div>

          {user && (
            <button 
              onClick={loadSpells}
              disabled={isLoading || spells.length > 0}
            >
              加载防御法术
            </button>
          )}
        </section>

        <section className="spell-list">
          <h2>防御法术库</h2>
          {spells.length > 0 ? (
            <ul>
              {spells.map(spell => (
                <li key={spell.id}>
                  <h3>{spell.name}</h3>
                  <p>{spell.description}</p>
                  <button 
                    onClick={() => castDefenseSpell(spell.id)}
                    disabled={isLoading}
                  >
                    施放法术
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>{user ? '点击按钮加载法术' : '请先进行灵魂绑定认证'}</p>
          )}
        </section>
      </div>

      <section className="defense-log">
        <h2>防御日志</h2>
        <div className="log-entries">
          {defenseLog.length > 0 ? (
            defenseLog.map(entry => (
              <div key={entry.id} className="log-entry">
                <span className="log-time">[{entry.time}]</span>
                <span className="log-message">{entry.message}</span>
              </div>
            ))
          ) : (
            <p>暂无防御活动</p>
          )}
        </div>
      </section>
    </div>
  );
}