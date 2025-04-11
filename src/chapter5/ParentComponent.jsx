import React, { useState } from 'react';
import OwlPost from './OwlPost';

const ParentComponent = () => {
  const [secretLetter, setSecretLetter] = useState('8!5@2%6#');
  const [replyStatus, setReplyStatus] = useState('等待回信');
  
  // 解密函数（父组件实现加密逻辑）
  const decrypt = (cipher) => {
    return cipher.split('').reverse().join('');
  };

  // 处理守护神回复
  const handleHogwartsResponse = (reply) => {
    setReplyStatus(`最新状态：${reply} ${new Date().toLocaleTimeString()}`);
  };

  return (
    <div className="owl-office">
      <h1>霍格沃茨通信局</h1>
      
      <OwlPost 
        sender="邓布利多"
        message={secretLetter}
        onReply={handleHogwartsResponse}
        decrypt={decrypt} // 传递解密方法
      />
      
      <div className="status-board">
        <p>{replyStatus}</p>
        <button onClick={() => setSecretLetter('新密信#' + Date.now().toString().slice(-4))}>
          生成新密信
        </button>
      </div>
    </div>
  );
};

export default ParentComponent;