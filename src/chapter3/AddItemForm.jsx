'use client';
import { useActionState } from 'react';
import { addItem } from './MagicShopApi';

export default function AddItemForm() {
  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        const newItem = {
          name: formData.get('name'),
          price: Number(formData.get('price'))
        };
        
        if (!newItem.name || !newItem.price) {
          return { error: "所有字段必须填写" };
        }

        const res = await addItem(newItem);
        return { success: true, item: res.item };
      } catch (err) {
        return { error: "猫头鹰邮递中断，请重试" };
      }
    },
    { error: null }
  );

  return (
    <form action={submitAction} className="magic-form">
      <div className="form-group">
        <label htmlFor="name">商品名称</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required
          placeholder="例如：火焰杯"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">价格（加隆）</label>
        <input
          type="number"
          id="price"
          name="price"
          min="1"
          required
          placeholder="例如：500"
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className={`spell-button ${isPending ? 'casting' : ''}`}
      >
        {isPending ? '正在施展复制咒...' : '添加新商品'}
      </button>

      {state.error && <div className="error-owl">{state.error}</div>}
      {state.success && (
        <div className="success-phoenix">
          成功添加：{state.item.name}（ID: {state.item.id}）
        </div>
      )}
    </form>
  );
}