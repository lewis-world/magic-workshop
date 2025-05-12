import { useState, useEffect } from 'react';
import './PotionShop.css';

/**
 * 霍格沃茨魔法商店 - 魔药订单系统
 */
function PotionShop() {
  const [potion, setPotion] = useState('福灵剂');
  const [quantity, setQuantity] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  // 模拟异步订单提交
  const placeOrder = () => {
    setOrderStatus('brewing'); // 酿造中状态
    setTimeout(() => {
      setOrderStatus('success');
    }, 1500);
  };

  // 暗黑模式切换效果
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* 暗黑模式切换按钮 */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform"
          aria-label="切换暗黑模式"
        >
          {isDarkMode ? '🔆' : '🌙'}
        </button>

        {/* 魔法卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transition-all hover:shadow-purple-500/20 hover:-translate-y-1">
          <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              魔法药剂商店
            </h1>
            
            {/* 魔药选择器 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">选择魔药</label>
              <select 
                value={potion}
                onChange={(e) => {setPotion(e.target.value); setOrderStatus(null);}}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {['福灵剂', '复方汤剂', '迷情剂', '活地狱汤剂', '吐真剂'].map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            
            {/* 数量选择器 */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">数量 (瓶)</label>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-l-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  -
                </button>
                <div className="flex-1 text-center py-2 bg-gray-100 dark:bg-gray-900">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-r-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* 订单按钮 - 不同状态显示不同内容 */}
            <button
              onClick={placeOrder}
              disabled={orderStatus === 'brewing'}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all 
                ${orderStatus === 'brewing' ? 'bg-yellow-600 animate-pulse' : 
                  orderStatus === 'success' ? 'bg-green-600 ring-2 ring-green-400' : 
                  'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg'}`}
            >
              {orderStatus === 'brewing' ? '酿造中...' : 
               orderStatus === 'success' ? '✅ 订单成功!' : 
               `支付 ${quantity * 10} 加隆`}
            </button>
            
            {/* 订单成功后的额外信息 */}
            {orderStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-800 dark:text-green-200 animate-fade-in">
                <p>您的{potion}将在3个工作日内通过猫头鹰送达!</p>
                { potion=='福灵剂' ? <p className="text-xs mt-1">注意：不要将福灵剂与咖啡因混合使用</p> : null }
              </div>
            )}
          </div>
        </div>
        
        {/* 小贴士 */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>✨ 点击右上角切换昼夜模式 ✨</p>
        </div>
      </div>
    </div>
  );
}

export default PotionShop;