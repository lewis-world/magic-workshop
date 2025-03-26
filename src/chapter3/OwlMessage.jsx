import { useState, useOptimistic } from 'react';
import './OwlMessage.css';
// 1. 模拟猫头鹰邮递服务
const sendOwl = async (message) => {
    // 模拟1-3秒网络延迟（随机成功/失败）
    await new Promise(resolve => 
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );
    
    // 30%概率模拟投递失败
    if (Math.random() < 0.3) {
      throw new Error("猫头鹰遭遇摄魂怪袭击！");
    }
    
    return { id: Date.now(), content: message };
  };
  
  // 2. 魔法消息组件
  function OwlMessage({ message }) {
    const [error, setError] = useState(null);
    const [optimisticMsg, setOptimisticMsg] = useOptimistic(
      message,
      (currentMsg, newMsg) => ({
        ...currentMsg,
        content: newMsg
      })
    );
  
    const handleSubmit = async (formData) => {
      const newContent = formData.get("message");
      try {
        // 触发乐观更新
        setOptimisticMsg(newContent);
        
        // 模拟API调用
        await sendOwl(newContent);
        setError(null);
      } catch (err) {
        // 失败时回滚到原始消息
        setOptimisticMsg(message);
        setError(err.message);
      }
    };
  
    return (
      <div className="owl-message">
        <div className={`message-bubble ${error ? "error" : ""}`}>
          {optimisticMsg.content}
          <div className="owl-flight"></div>
        </div>
        
        <form action={handleSubmit}>
          <input
            name="message"
            placeholder="输入你的魔法讯息"
            disabled={optimisticMsg.content !== message.content}
          />&nbsp;
          <button 
            type="submit"
            className={optimisticMsg.content !== message.content ? "sending" : ""}
          >
            {optimisticMsg.content !== message.content 
              ? "🦉 讯息传递中..." 
              : "发送猫头鹰"}
          </button>
        </form>
        
        {error && <div className="owl-alert">⚠️ {error}</div>}
      </div>
    );
}

export default OwlMessage;