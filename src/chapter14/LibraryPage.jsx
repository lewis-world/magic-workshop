import { useState, useEffect } from 'react';
import { createClient } from './mockClient';
import BookList from './BookList';

export default function LibraryPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
        try {
            const supabase = createClient(); // 初始化 Supabase 客户端
            // 获取所有魔法书（服务端直接查询数据库）
            const { data: books, error } = await supabase
            .from('magic_books')
            .select();
            setBooks(books);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };
        
        loadData();
    }, []);

    if (loading) return <div>加载魔法书中...</div>;
    if (error) return <div>⚠️ 魔法失效: {error}</div>;

    return <BookList books={books} />;
}