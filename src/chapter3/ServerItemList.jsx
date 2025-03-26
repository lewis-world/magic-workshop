import { fetchItems } from './MagicShopApi';

export default async function ServerItemList() {
  const { data } = await fetchItems();
  
  return (
    <div className="ancient-scroll">
      <h3>魔法商品库存 ({data.length}件)</h3>
      <ul className="item-list">
        {data.map(item => (
          <li key={item.id} className="glowing-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price}加隆</span>
          </li>
        ))}
      </ul>
    </div>
  );
}