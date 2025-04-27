type Book = {
    id: number;
    title: string;
    author: string;
    summary?: string;
  };
  
  export function createClient() {
    // 模拟数据库数据
    const mockBooks: Book[] = [
      {
        id: 1,
        title: "高级魔药制作",
        author: "利巴修·波拉奇",
        summary: "包含福灵剂的详细配方"
      },
      {
        id: 2,
        title: "魁地奇溯源",
        author: "肯尼沃思·惠斯普",
        summary: "详解金色飞贼的演变史"
      }
    ];
  
    return {
      from: () => ({
        select: () =>  new Promise((resolve) => {
          setTimeout(() => {
              // 模拟 Supabase 的返回格式
              resolve({ data: mockBooks, error: null });
          }, 1000); 
      })
      })
    };
  }