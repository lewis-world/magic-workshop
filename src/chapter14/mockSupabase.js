const mockCourses = [
    {
      id: 1,
      course_name: "黑魔法防御术",
      professor: "莱姆斯·卢平",
      start_time: "2025-04-25T09:00:00",
      classroom: "三楼右侧"
    },
    {
      id: 2,
      course_name: "魔药学",
      professor: "西弗勒斯·斯内普",
      start_time: "2025-04-25T11:00:00",
      classroom: "地下教室"
    }
  ];
  
export const mockSupabase = {
    from: () => ({
        select: () => new Promise((resolve) => {
            setTimeout(() => {
                // 模拟 Supabase 的返回格式
                resolve({ data: mockCourses, error: null });
            }, 1000); 
        })
    })
};