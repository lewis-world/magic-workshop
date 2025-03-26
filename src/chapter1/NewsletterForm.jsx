import { useActionState } from 'react'
import { sendOwl } from './owl-service';

function NewsletterForm() {
    const [state, submitAction, isPending] = useActionState(
      async (prevState, formData) => {
        const email = formData.get('email');
        const result = await sendOwl(email);
        
        // 成功时清空输入框
        if (result.success) {
          document.querySelector('input[name="email"]').value = '';
        }
        
        return result.error 
          ? { error: result.error } 
          : { success: true };
      },
      { error: null, success: false }
    );
  
    return (
      <form 
        action={submitAction}
        className="owl-form"
        onSubmit={(e) => {
          // 客户端即时验证
          const email = e.currentTarget.email.value;
          if (!email) {
            e.preventDefault();
            return { error: "请填写猫头鹰地址" };
          }
        }}
      >
        <div className="form-group">
          <input 
            name="email"
            type="email"
            placeholder="你的猫头鹰地址"
            pattern=".+@wizarding\.world"
            title="必须使用魔法部认证邮箱"
            disabled={isPending}
          />
          
          <button 
            type="submit"
            disabled={isPending}
            className={`spell-button ${isPending ? 'casting' : ''}`}
          >
            {isPending ? '🦉 猫头鹰飞行中...' : '立即订阅'}
          </button>
        </div>
  
        {/* 反馈信息展示 */}
        {state.error && (
          <div className="owl-alert error">
            ⚡ {state.error}
          </div>
        )}
        {state.success && (
          <div className="owl-alert success">
            ✨ 订阅成功！《预言家日报》即将送达
          </div>
        )}
      </form>
    );
}
export default NewsletterForm;