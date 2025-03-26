import fetchForbiddenSpells from './api';
import React from 'react';

function DarkArtsListContent({ spells }) {
  if (!spells) return null;
  
  return (
    <ul className="forbidden-list">
      {spells.map(s => (
        <li key={s.id} className="glowing-item">
          <span className="spell-name">{s.name}</span>
          <span className="spell-level">{s.level}</span>
        </li>
      ))}
    </ul>
  );
}

const DarkArtsList = React.lazy(async () => {
  try {
    const spells = await fetchForbiddenSpells();
    return { default: () => <DarkArtsListContent spells={spells} /> };
  } catch (error) {
    return { default: () => <div className="error">⚠️ 禁术召唤失败: {error.message}</div> };
  }
});

export default DarkArtsList;