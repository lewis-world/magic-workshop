import React from "react";
import PotionBrewer from "./PotionBrewer";

function SpellCaster({ name }) {
    return <div className="wizard">{name}的魔杖已就绪！</div>;
}

const TowerLayout = ({ children }) => {
    // 验证子组件类型
    React.Children.forEach(children, child => {
      if (!['SpellCaster', 'PotionBrewer'].includes(child.type.name)) {
        console.error('无效的子组件:', child.type.name);
      }
    });
  
    return <div className="magic-tower-layout">{children}</div>;
  };

const WizardTower = function WizardTower() {
    // 示例数据（建议通过props传入）
    const potionList = [
      { id: 1, name: "隐身药水", effect: "隐藏身形" },
      { id: 2, name: "治愈药剂", effect: "恢复生命" }
    ];
  
    return (
      <TowerLayout>
        <SpellCaster name="哈利" />
        <PotionBrewer potions={potionList} /> 
      </TowerLayout>
    );
}

export default WizardTower;