import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 重构后的验证规则 - 使用更可靠的条件验证方式
const schema = yup.object().shape({
  wizardName: yup.string().required('必须输入巫师姓名'),
  patronus: yup.string().required('必须选择守护神').oneOf(
    ['牡鹿', '水獭', '狼', '凤凰'], 
    '无效的守护神类型'
  ),
  sendByOwl: yup.boolean(),
  owlName: yup.string().test(
    'owl-name-required',
    '使用猫头鹰必须命名',
    function(value) {
      // 更可靠的条件验证方式
      return !this.parent.sendByOwl || (value && value.trim().startsWith('猫头鹰') && value.trim().length >= 4);
    }
  )
});

export function WizardRegistrationForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    trigger
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      wizardName: '',
      patronus: '牡鹿',
      sendByOwl: false,
      owlName: ''
    }
  });

  const sendByOwl = watch("sendByOwl");

  // 当sendByOwl变化时触发验证
  React.useEffect(() => {
    if (sendByOwl) {
      trigger("owlName");
    }
  }, [sendByOwl, trigger]);

  const sendOwlPost = (data) => {
    console.log('表单数据:', data);
    alert('表单提交成功!');
  };

  return (
    <form onSubmit={handleSubmit(sendOwlPost)} className="magic-form">
      <div className="form-field">
        <label>巫师姓名</label>
        <input {...register("wizardName")} />
        {errors.wizardName && (
          <span className="error">{errors.wizardName.message}</span>
        )}
      </div>

      <div className="form-field">
        <label>守护神形态</label>
        <select {...register("patronus")}>
          <option value="牡鹿">牡鹿</option>
          <option value="水獭">水獭</option>
          <option value="狼">狼</option>
          <option value="凤凰">凤凰</option>
        </select>
        {errors.patronus && (
          <span className="error">{errors.patronus.message}</span>
        )}
      </div>

      <div className="form-field">
        <label>
          <input 
            type="checkbox" 
            {...register("sendByOwl")} 
            onChange={(e) => {
              register("sendByOwl").onChange(e); // 保持原生注册
              trigger("owlName"); // 立即触发验证
            }}
          />
          使用猫头鹰邮递
        </label>
      </div>

      {sendByOwl && (
        <div className="form-field">
          <label>猫头鹰名称</label>
          <input {...register("owlName")} />
          {errors.owlName && (
            <span className="error">{errors.owlName.message}</span>
          )}
        </div>
      )}

      <button type="submit" className="submit-button">
        提交预言
      </button>
    </form>
  );
}