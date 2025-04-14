import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export function DynamicSpellForm() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      spells: [{ name: "Expelliarmus" }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "spells"
  });

  const [activeSpell, setActiveSpell] = useState(null);

  const onSubmit = (data) => {
    console.log('选择的咒语:', data.spells);
    alert(`已准备 ${data.spells.length} 个咒语对抗黑魔法`);
  };

  const addNewSpell = () => {
    const newId = Date.now();
    append({ id: newId, name: "" });
    setActiveSpell(newId);
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="spell-form">
      <h3>黑魔法防御术准备</h3>
      
      <div className="spell-list">
        {fields.map((item, index) => (
          <div key={item.id} className={`spell-item ${activeSpell === item.id ? 'active' : ''}`}>
            <div className="spell-input">
              <input
                {...register(`spells.${index}.name`, { 
                  required: "咒语名称不能为空" 
                })}
                placeholder="输入咒语名称"
                onFocus={() => setActiveSpell(item.id)}
              />
              <button 
                type="button" 
                onClick={() => remove(index)}
                className="remove-button"
              >
                遗忘
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          onClick={addNewSpell}
          className="add-button"
        >
          添加新咒语 +
        </button>
        
        <button type="submit" className="submit-button">
          完成准备
        </button>
      </div>

      <div className="spell-tip">
        {fields.length > 3 ? (
          <p className="warning">⚠️ 警告：同时准备太多咒语可能导致魔力紊乱</p>
        ) : (
          <p>推荐准备3-5个常用防御咒语</p>
        )}
      </div>
    </form>
  );
}