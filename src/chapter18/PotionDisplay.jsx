import { useMagicStore } from "./store";
export function PotionDisplay() {
    const potions = useMagicStore(state => state.potions);
    
    return (
      <div className="potion-grid">
        {potions.map(potion => (
          <div key={potion.id} className="potion-card">
            <h3>{potion.name}</h3>
            <p>价格: {potion.price} 加隆</p>
            <p>库存: {potion.stock} 瓶</p>
            <p>效果: {potion.effect}</p>
            <button onClick={() => useMagicStore.getState().buyPotion(potion.id)}>
              🧪 购买（需{potion.price}加隆）
            </button>
          </div>
        ))}
      </div>
    );
  }