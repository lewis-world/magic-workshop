"use client";
import { useActionState, useEffect, useState } from 'react';
import { borrowBook, getBookList } from './server-actions';
import styles from './LibraryStyles.module.css';

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [state, borrowAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        const result = await borrowBook(
          formData.get('bookId'),
          formData.get('readerName')
        );
        return { ...result, error: null };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    null
  );

  // 初始化加载书籍
  useEffect(() => {
    const loadBooks = async () => {
      const bookList = await getBookList();
      setBooks(bookList);
    };
    loadBooks();
  }, [state]); // 当借阅状态变化时重新加载

  return (
    <div className={styles.libraryContainer}>
      <h1 className={styles.title}>🔮 魔法图书馆</h1>
      
      <div className={styles.bookGrid}>
        {books.map(book => (
          <div key={book.id} className={`${styles.bookCard} ${!book.available ? styles.unavailable : ''}`}>
            <h3>{book.title}</h3>
            <p>作者: {book.author}</p>
            <p>状态: {book.available ? '🟢 可借阅' : '🔴 已借出'}</p>
            
            {book.available && (
              <form action={borrowAction} className={styles.borrowForm}>
                <input type="hidden" name="bookId" value={book.id} />
                <input 
                  type="text" 
                  name="readerName" 
                  placeholder="输入你的法师名" 
                  required
                  className={styles.inputField}
                />
                <button 
                  type="submit" 
                  disabled={isPending}
                  className={styles.borrowButton}
                >
                  {isPending ? '施展借阅咒语中...' : '借阅此书'}
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      {state?.error && (
        <div className={styles.errorBox}>
          <p>❌ 咒语失败: {state.error}</p>
        </div>
      )}

      {state?.success && (
        <div className={styles.successBox}>
          <p>✨ {state.message}</p>
          <p>归还期限: {state.dueDate}</p>
        </div>
      )}
    </div>
  );
}