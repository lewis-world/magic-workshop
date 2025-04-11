import './App.css'
import React from 'react';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

import { spellReducer, enemyReducer } from './chapter4/store';
import { comboMiddleware } from './chapter4/middleware';
import {AdvancedSpells} from './chapter4/AdvancedSpells';
import MagicForum from "./chapter4/MagicForum";
// 启用 Immer 的 MapSet 插件
enableMapSet();

// 定义 App 组件
function App() {
  return (
    <>
    <Provider store={store}>
      <AdvancedSpells/>
    </Provider>
    <br/>
    <MagicForum/>
    </>
  );
}

// 创建魔法商店
const store = configureStore({
  reducer: {
      spells: spellReducer,
      enemies: enemyReducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
      serializableCheck: {
      ignoredActions: ['CAST_FIREBALL', 'CAST_LIGHTNING'],
      ignoredActionPaths: ['payload.cooldowns'],
      ignoredPaths: ['spells.cooldowns']
      }
  }).concat(comboMiddleware)
});

export default App;