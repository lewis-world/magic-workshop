'use client';
import { Suspense } from 'react';
import ServerItemList from './ServerItemList';
import AddItemForm from './AddItemForm';
import './MagicShop.css';

export default function MagicShop() {
  return (
    <div className="magic-shop">
      <h1 className="shop-title">奥利凡德魔杖店后台</h1>
      
      <Suspense fallback={<div className="loading-broom">正在召唤商品列表...</div>}>
        <ServerItemList />
      </Suspense>

      <div className="divider-line"></div>
      
      <h2 className="section-title">添加新商品</h2>
      <AddItemForm />
    </div>
  );
}