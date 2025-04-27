// 服务端组件（权限校验 + 基础渲染）
import React, { useState, useEffect } from 'react';
import DefenseInterface from './DefenseInterface'; 
import { getCurrentWizard } from './magic-utils';

export default function DefenseLesson() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentWizard();
        setUser(userData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 服务端权限校验（模拟魔法部认证）
  if (!prophecyDepartmentAuth(user)) {
    return (
      <div className="auth-fail">
        ⚠️ 未通过摄魂怪防御考核！<br />
        <small>请联系黑魔法防御术教授</small>
      </div>
    );
  }

  // 通过校验后渲染客户端交互内容
  return (
    <div className="dark-arts-defense">
      <h1>🛡️ 高级守护神咒训练</h1>
      <DefenseInterface />
    </div>
  );
}

// 模拟权限校验函数
function prophecyDepartmentAuth(user) {
    // 实际项目中这里可能是数据库查询或JWT验证
    return user?.licenseLevel >= 3; // 3级及以上巫师可通过
}