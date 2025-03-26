import { memo, useMemo, useCallback } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import './PotionWorkshop.css';
// 优化后的魔药配方组件
const PotionRecipe = memo(({ ingredients, onBrew }) => {
  const [animationParent] = useAutoAnimate({ duration: 300 });
  
  const memoizedIngredients = useMemo(() => (
    ingredients.map(i => ({
      ...i,
      label: `${i.name} (${i.quantity}克)`
    }))
  ), [ingredients]);

  return (
    <div className="potion-scroll">
      <h3>⚗️ 魔药配方</h3>
      <ul ref={animationParent} className="ingredient-list">
        {memoizedIngredients.map(i => (
          <IngredientItem 
            key={i.id}
            data={i}
            onClick={() => onBrew(i.id)}
          />
        ))}
      </ul>
    </div>
  );
}, (prevProps, nextProps) => {
  // 自定义比较逻辑
  return (
    prevProps.ingredients === nextProps.ingredients &&
    prevProps.onBrew === nextProps.onBrew
  );
});

// 子组件二次优化
const IngredientItem = memo(({ data, onClick }) => (
  <li className="glowing-item">
    <div className="ingredient-card">
      <span>{data.label}</span>&nbsp;
      <button 
        onClick={onClick}
        className="brew-button"
      >
        开始熬制
      </button>
    </div>
  </li>
));

// 父组件使用示例
function PotionWorkshop() {
  const ingredients = useMemo(() => [
    { id: 1, name: "龙鳞", quantity: 30 },
    { id: 2, name: "月光草", quantity: 15 }
  ], []); // 依赖项为空数组表示永久缓存

  const handleBrew = useCallback((id) => {
    console.log(`开始熬制编号 ${id} 的材料`);
  }, []);

  return (
    <PotionRecipe 
      ingredients={ingredients}
      onBrew={handleBrew}
    />
  );
}

export default PotionWorkshop;