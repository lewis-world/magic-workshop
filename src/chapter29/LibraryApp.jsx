import React, { useState } from 'react';
import { portalBus } from './magicPortalBus';

const LibraryApp = () => {
  const [books, setBooks] = useState([
    '高级魔药制作',
    '神奇动物在哪里',
    '黑魔法防御术'
  ]);
  const [currentBook, setCurrentBook] = useState('');

  return (
    <div className="library-app">
      <h2>魔法图书馆</h2>
      <ul>
        {books.map(book => (
          <li key={book}>{book}</li>
        ))}
      </ul>
      <input 
        value={currentBook}
        onChange={(e) => setCurrentBook(e.target.value)}
        placeholder="输入新书名"
      />
      <button onClick={() => {
        if (currentBook) {
          setBooks([...books, currentBook]);
          setCurrentBook('');
        }
      }}>
        添加书籍
      </button>
    </div>
  );
};

export default LibraryApp;