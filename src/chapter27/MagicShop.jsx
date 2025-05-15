import React from 'react';
import { ReduxImplementation } from './ReduxImplementation';
import { MobxImplementation } from './MobxImplementation';
import { ZustandImplementation } from './ZustandImplementation';
import './MagicShop.css';

export default function MagicShop() {
  return (
    <div className="magic-shop">
      <h1>奥利凡德魔法商店</h1>
      <div className="implementations">
        <ReduxImplementation />
        <MobxImplementation />
        <ZustandImplementation />
      </div>
    </div>
  );
}