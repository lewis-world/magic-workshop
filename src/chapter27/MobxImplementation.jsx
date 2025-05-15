import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { mockApi } from './mockApi';

class MobxShopStore {
  items = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchItems();
  }

  async fetchItems() {
    this.loading = true;
    try {
      const items = await mockApi.fetchItems();
      runInAction(() => { this.items = items; }); 
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  async purchaseItem(id) {
    this.loading = true;
    try {
      await mockApi.purchase(id);
      runInAction(() => {
        const item = this.items.find(i => i.id === id);
        if (item) item.stock -= 1;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      })
    } finally {
      this.loading = false;
    }
  }
}

const mobxStore = new MobxShopStore();

const MobxImplementation = observer(() => {
  return (
    <div className="shop-card">
      <h2 className="shop-title">MobX实现</h2>
      <ul className="item-list">
        {mobxStore.items.map(item => (
          <li key={item.id} className="item">
            <span className="item-name">{item.name}</span>
            <div>
              <span className="item-stock">库存: {item.stock}</span>
              <button 
                onClick={() => mobxStore.purchaseItem(item.id)} 
                disabled={item.stock <= 0 || mobxStore.loading}
              >
                购买
              </button>
            </div>
          </li>
        ))}
      </ul>
      {mobxStore.loading && <div className="status">魔法生效中...</div>}
      {mobxStore.error && <div className="status error">{mobxStore.error}</div>}
    </div>
  );
});

export { mobxStore, MobxImplementation };