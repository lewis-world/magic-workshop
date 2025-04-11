import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './parchment.css';
import {PatronusButton} from './PatronusButton';
const OwlPost = ({ 
  sender = '未知发件人',
  message = '紧急警报',
  onReply,
  decrypt 
}) => {
  const [isDecrypted, setIsDecrypted] = useState(false);

  const handleDecrypt = () => {
    setIsDecrypted(true);
  };

  return (
    <div className="owl-nest">
      <h2>📨 来自{sender}的密信</h2>
      
      <div className="parchment">
        {isDecrypted ? (
          <p className="reveal-text">{decrypt(message)}</p>
        ) : (
          <p className="cipher-text">{message}</p>
        )}
        
        <button 
          onClick={handleDecrypt}
          className="decrypt-btn"
        >
          🔓 解除封印
        </button>
      </div>

      <br/>
      <PatronusButton  
        onActivate={() => onReply('守护神已出发')}
        className="patronus-btn"
      >
        🦌 激活守护神回复
      </PatronusButton >
    </div>
  );
};

// 类型校验
OwlPost.propTypes = {
  sender: PropTypes.string.isRequired,
  message: PropTypes.string,
  onReply: PropTypes.func.isRequired,
  decrypt: PropTypes.func.isRequired
};

OwlPost.defaultProps = {
  message: '紧急警报'
};

export default OwlPost;