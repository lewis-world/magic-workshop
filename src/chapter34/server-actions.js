"use server";

// 模拟数据库
const libraryDB = {
  books: [
    { id: 1, title: "React魔法指南", author: "张大师", available: true },
    { id: 2, title: "Next.js秘境", author: "李先知", available: true },
    { id: 3, title: "JavaScript炼金术", author: "王术士", available: false }
  ],
  borrowRecords: []
};

// 模拟revalidatePath功能
let shouldRevalidate = false;

// Server Action: 借阅书籍
export async function borrowBook(bookId, readerName) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const book = libraryDB.books.find(b => b.id === Number(bookId));
  
  if (!book) {
    throw new Error("魔法书不存在！");
  }
  
  if (!book.available) {
    throw new Error("这本魔法书已被其他法师借走！");
  }
  
  // 更新书籍状态
  book.available = false;
  
  // 添加借阅记录
  libraryDB.borrowRecords.push({
    bookId: book.id,
    readerName,
    borrowDate: new Date().toISOString()
  });
  
  // 标记需要重新验证
  shouldRevalidate = true;
  
  return {
    success: true,
    message: `借阅成功！《${book.title}》已加入你的魔法背包`,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
  };
}

// Server Action: 获取书籍列表
export async function getBookList() {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (shouldRevalidate) {
    shouldRevalidate = false;
    return [...libraryDB.books]; // 返回新数组触发更新
  }
  return libraryDB.books;
}