import React from 'react';
import { create } from 'zustand';
import { mockApi } from './mockApi';

const useZustandStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,
  
  fetchItems: async () => {
    set({ loading: true });
    try {
      const items = await mockApi.fetchItems();
      set({ items });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  purchaseItem: async (id) => {
    set({ loading: true });
    try {
      await mockApi.purchase(id);
      set(state => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, stock: item.stock - 1 } : item
        )
      }));
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));

function ZustandImplementation() {
  const { items, loading, fetchItems, purchaseItem } = useZustandStore();
  
  React.useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="shop-card">
      <h2 className="shop-title">Zustand实现</h2>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            <span className="item-name">{item.name}</span>
            <div>
              <span className="item-stock">库存: {item.stock}</span>
              <button 
                onClick={() => purchaseItem(item.id)} 
                disabled={item.stock <= 0 || loading}
              >
                购买
              </button>
            </div>
          </li>
        ))}
      </ul>
      {loading && <div className="status">魔法生效中...</div>}
    </div>
  );
}

export { useZustandStore, ZustandImplementation };