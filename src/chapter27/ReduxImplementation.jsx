import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockApi } from './mockApi';

// Redux store配置
const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(purchaseItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(purchaseItem.fulfilled, (state, action) => {
        const item = state.items.find(i => i.id === action.payload.id);
        if (item) item.stock -= 1;
        state.loading = false;
      });
  }
});

export const fetchItems = createAsyncThunk('shop/fetchItems', async () => {
  const response = await mockApi.fetchItems();
  return response;
});

export const purchaseItem = createAsyncThunk('shop/purchaseItem', async (id) => {
  const response = await mockApi.purchase(id);
  if (!response.success) throw new Error('购买失败');
  return response;
});

const store = configureStore({
  reducer: {
    shop: shopSlice.reducer
  }
});

function ReduxImplementation() {
  const { items, loading } = useSelector(state => state.shop);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handlePurchase = (id) => {
    dispatch(purchaseItem(id));
  };

  return (
    <div className="shop-card">
      <h2 className="shop-title">Redux实现</h2>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            <span className="item-name">{item.name}</span>
            <div>
              <span className="item-stock">库存: {item.stock}</span>
              <button 
                onClick={() => handlePurchase(item.id)} 
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

export { store, ReduxImplementation };