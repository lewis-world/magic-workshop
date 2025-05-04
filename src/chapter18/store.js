import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useMagicStore = create(
    devtools(
      persist(
        (set, get) => ({
          // 基础状态
          gold: 1000,
          potions: [
            { id: 1, name: '福灵剂', price: 50, stock: 3, effect: '幸运加成' },
            { id: 2, name: '吐真剂', price: 30, stock: 5, effect: '强制说真话' }
          ],
          
          // 同步魔法
          buyPotion: (id) => {
            const potion = get().potions.find(p => p.id === id);
            if (!potion || potion.stock <= 0) return;
            
            set({
              gold: get().gold - potion.price,
              potions: get().potions.map(p => 
                p.id === id ? {...p, stock: p.stock - 1} : p
              )
            });
          },
          
          // 异步魔法（模拟猫头鹰邮递）
          fetchPotions: async () => {
            set({ isLoading: true });
            
            // 模拟网络请求延迟
            await new Promise(resolve => 
              setTimeout(resolve, 1500 + Math.random() * 1000)
            );
            
            // 收到新魔药配方
            const newPotions = [
              { id: 3, name: '迷情剂', price: 45, stock: 2, effect: '制造爱情幻觉' },
              { id: 4, name: '复方汤剂', price: 60, stock: 1, effect: '变形为他人外貌（需目标DNA）' }
            ];
            
            set({ 
              potions: [...get().potions, ...newPotions],
              isLoading: false 
            });
          }
        }),
        {
          name: 'magic-store', // 冥想盆存储名称
          blacklist: ['isLoading'] // 不保存加载状态          
        }
      )
    )
  );