'use client';
import { useState } from 'react';

export default function BookItem({ book }) {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div 
      className="book-card"
      onClick={() => setShowSummary(!showSummary)}
    >
      <h3>{book.title}</h3>
      <p className="author">👨‍🏫 {book.author}</p>
      
      {showSummary && (
        <div className="summary">
          {book.summary || "（这本书的内容被施了保密咒）"}
        </div>
      )}
    </div>
  );
}