import React, { createContext, useContext, useState, useMemo, useEffect, useCallback, memo } from 'react';
import { OwlContextType, OwlMessage } from './OwlInterface';
// import { OwlMessageComponent } from './OwlMessageComponent';
import './OwlNetWork.css';

// 创建上下文
const OwlContext = createContext<OwlContextType | null>(null);

// 网络核心组件（Provider）
export const OwlNetwork = ({ children }) => {
  // 持久化存储
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('owl-messages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('owl-messages', JSON.stringify(messages));
  }, [messages]);

  // 优化发送函数
  const sendMessage = useCallback((content) => {
    setMessages(prev => [
      ...prev,
      { 
        id: crypto.randomUUID(),
        content,
        timestamp: Date.now()
      }
    ]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // 上下文值优化
  const contextValue = useMemo(() => ({
    messages,
    sendMessage,
    clearMessages
  }), [messages, sendMessage, clearMessages]);

  return (
    <OwlContext.Provider value={contextValue}>
      <div className="owl-network">
        {children}
      </div>
    </OwlContext.Provider>
  );
};

// 自定义Hook封装
const useOwlNetwork = () => {
  const context = useContext(OwlContext);
  if (!context) {
    throw new Error('useOwlNetwork必须在OwlNetwork内使用');
  }
  return context;
};

// 消息接收组件
export const OwlStation = memo(() => {
  const { messages } = useOwlNetwork();

  return (
    <div className="owl-station">
      {messages.length === 0 ? (
        <div className="empty-state">🦉 没有等待中的猫头鹰信件</div>
      ) : (
        messages.map(msg => (
          <OwlMessageComponent key={msg.id} {...msg} />
        ))
      )}
    </div>
  );
});

const OwlMessageComponent = memo(({ content, timestamp }: OwlMessage) => (
    <div className="owl-message">
      <span className="timestamp">
        {new Date(timestamp).toLocaleTimeString()}
      </span>
      <div className="content">
        <span className="owl-icon">🦉</span>
        {content}
      </div>
    </div>
  ));

// 消息发送组件
export const OwlSender = () => {
  const [input, setInput] = useState("");
  const { sendMessage } = useOwlNetwork();

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="owl-sender">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入猫头鹰信件内容..."
        onKeyUp={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>
        发送猫头鹰
      </button>
    </div>
  );
};