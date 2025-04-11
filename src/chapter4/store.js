// ========================
// ⚙️ Redux配置 - store.js
// ========================
import { createSlice } from '@reduxjs/toolkit';

// 法术系统 Reducer
export const spellSlice = createSlice({
  name: 'spells',
  initialState: {
    mana: 100,
    comboCount: 0,
    cooldowns: {}
  },
  reducers: {
    CAST_FIREBALL: (state, action) => {
      const { manaCost } = action.payload;
      console.log(`CAST_FIREBALL action received with manaCost=${manaCost}`); // 添加日志
      if (state.mana >= manaCost) {
        state.mana -= manaCost;
        state.comboCount += 1;
        console.log(`CAST_FIREBALL: mana=${state.mana}, comboCount=${state.comboCount}`); // 添加日志
      } else {
        console.log(`Not enough mana to cast FIREBALL. Current mana=${state.mana}`); // 添加日志
      }
    },
    CAST_LIGHTNING: (state, action) => {
      const { manaCost } = action.payload;
      console.log(`CAST_LIGHTNING action received with manaCost=${manaCost}`); // 添加日志
      if (state.mana >= manaCost) {
        state.mana -= manaCost;
        state.comboCount += 1;
        console.log(`CAST_LIGHTNING: mana=${state.mana}, comboCount=${state.comboCount}`); // 添加日志
      } else {
        console.log(`Not enough mana to cast LIGHTNING. Current mana=${state.mana}`); // 添加日志
      }
    },
    RESTORE_MANA: (state, action) => {
      state.mana = Math.min(100, state.mana + action.payload);
      console.log(`RESTORE_MANA: mana=${state.mana}`); // 添加日志
    },
    RESET_COMBO: (state) => {
      state.comboCount = 0;
      console.log(`RESET_COMBO: comboCount=${state.comboCount}`); // 添加日志
    }
  }
});

// 敌人系统 Reducer
export const enemySlice = createSlice({
  name: 'enemies',
  initialState: [
    { id: 'dragon', position: { x: 100, y: 100 }, hp: 100, maxHp: 100 },
    { id: 'goblin1', position: { x: 200, y: 150 }, hp: 50, maxHp: 50 },
    { id: 'goblin2', position: { x: 300, y: 200 }, hp: 50, maxHp: 50 },
    { id: 'goblin3', position: { x: 400, y: 250 }, hp: 50, maxHp: 50 }
  ],
  reducers: {
    DAMAGE_ENEMY: (state, action) => {
      const { id, damage } = action.payload;
      const enemy = state.find(e => e.id === id);
      if (enemy) {
        enemy.hp = Math.max(0, enemy.hp - damage);
        console.log(`DAMAGE_ENEMY: id=${id}, damage=${damage}, new hp=${enemy.hp}`); // 添加日志
      }
    }
  }
});

export const { CAST_FIREBALL, CAST_LIGHTNING, RESTORE_MANA, RESET_COMBO } = spellSlice.actions;
export const { DAMAGE_ENEMY } = enemySlice.actions;

export const spellReducer = spellSlice.reducer;
export const enemyReducer = enemySlice.reducer;