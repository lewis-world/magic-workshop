import { useMagicStore } from "./store";
import { PotionDisplay } from "./PotionDisplay";

export function MagicShop() {
  const { 
    gold, 
    fetchPotions,
    isLoading 
  } = useMagicStore();
  

  const MagicWandIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7 21L10 18M13 15L16 12L19 15L16 18M10 6L13 3L16 6L13 9M22 5L17 10L14 7L19 2L22 5Z" 
            stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
  
  const CoinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" fill="#D4AF37" stroke="#B8860B" strokeWidth="1"/>
      <path d="M10 6V14M6 10H14" stroke="#FFF" strokeWidth="1"/>
    </svg>
  );

  const nukeStore = () => useMagicStore.setState({}, true);
  return (
    <div className="magic-shop">
      <h1><MagicWandIcon /> 奥利凡德魔药专卖店</h1>
      <div className="gold">金加隆: {gold} <CoinIcon /></div>
      
      <PotionDisplay />
      <br />
      <button 
        onClick={fetchPotions}
        disabled={isLoading}
        className="fetch-button"
      >
        {isLoading ? '猫头鹰飞行中... 🦉' : '召唤新魔药 ✨'}
      </button>

      {/* <button onClick={nukeStore} className="fetch-button">
        💀 黑魔法清空（慎用！）
      </button> */}
    </div>
  );
}