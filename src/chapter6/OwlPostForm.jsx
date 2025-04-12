import { useActionState, useOptimistic } from 'react';
import './OwlPostForm.css';

// 猫头鹰邮递服务模拟
const owlPost = async (msg) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (Math.random() > 0.2) return; // 20%几率投递失败
    throw new Error('猫头鹰迷路了');
  };

export const OwlPostForm = () => {
  // 真实状态管理
  const [realMessages, submitAction, isPending] = useActionState(
    async (prevMsgs, formData) => {
      try {
        await owlPost(formData.get('msg'));
        return [...prevMsgs, { 
          id: Date.now(),
          content: formData.get('msg'),
          status: 'sent'
        }];
      } catch (err) {
        return prevMsgs.map(msg => 
          msg.status === 'sending' ? { ...msg, status: 'failed' } : msg
        );
      }
    },
    []
  );

  // 乐观更新
  const [optimisticMsgs, addOptimistic] = useOptimistic(
    realMessages,
    (prevMsgs, newMsg) => [
      ...prevMsgs,
      { id: Date.now(), content: newMsg, status: 'sending' }
    ]
  );

  const handleSubmit = (formData) => {
    const newMsg = formData.get('msg');
    addOptimistic(newMsg); // 触发乐观更新
    submitAction(formData); // 提交真实数据
  };

  return (
    <div className="owl-post-container">
      <form action={handleSubmit}>
        <input
          name="msg"
          placeholder="给邓布利多写信..."
          disabled={isPending}
          className="owl-input"
        />
        <button 
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: isPending ? '#ccc' : '#61dafb' }}
        >
          {isPending ? '猫头鹰飞行中...' : '发送信件'}
        </button>
      </form>

      <div className="message-list">
        {optimisticMsgs.map(msg => (
          <div 
            key={msg.id}
            className={`message-bubble ${msg.status}`}
            aria-live="polite"
          >
            <div className="message-content">
              <p>{msg.content}</p>
              {/* 状态指示器 */}
              {msg.status === 'sending' && (
                <div className="owl-progress">
                  <div className="owl-wing"></div>
                </div>
              )}
              {msg.status === 'failed' && (
                <button 
                  className="retry-button"
                  onClick={() => submitAction(new FormData())}
                  style={{ marginLeft: '10px' }}
                >
                  ↺ 重试
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};