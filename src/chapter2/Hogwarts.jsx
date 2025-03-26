import { useState, useEffect } from 'react'

// 1. 城堡容器组件（显示学院布局）
function Castle({ children }) {
    const [currentTime, setCurrentTime] = useState("午夜");
    
    useEffect(() => {
      const timer = setInterval(() => {
        const hours = new Date().getHours();
        setCurrentTime(
          hours < 6 ? "深夜" : 
          hours < 12 ? "清晨" :
          hours < 18 ? "白昼" : "黄昏"
        );
      }, 60000);
      
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div className="moving-castle">
        <div className="time-banner">🕰️ 当前时间: {currentTime}</div>
        <div className="house-container">
          {children}
        </div>
      </div>
    );
  }
  
  // 2. 学院组件（动态管理学生）
  function Gryffindor({ children }) {
    const [students, setStudents] = useState(["赫敏", "罗恩", "哈利"]);
    const [newStudent, setNewStudent] = useState("");
  
    const addStudent = () => {
      if (newStudent) {
        setStudents(prev => [...prev, newStudent]);
        setNewStudent("");
      }
    };
  
    return (
      <div className="house gryffindor">
        <div className="banner">
          🦁 格兰芬多 (当前人数: {students.length + 1})
        </div>
        {/* 显示传入的子组件 */}
        {children}
        
        <div className="student-list">
          {students.map((name) => (
            <Student key={name} name={name} />
          ))}
          <div className="add-student">
            <input
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
              placeholder="输入新学员名字"
            />
            <button onClick={addStudent} className="golden-button">
              加入学院
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // 3. 学生组件（带交互功能）
  function Student({ name }) {
    const [score, setScore] = useState(0);
    
    return (
      <div className="student-card">
        <div className="badge">⚡</div>
        <span className="name">{name}</span>
        <div className="score-control">
          <button onClick={() => setScore(s => s - 10)}>➖</button>
          <span className="points">{score} 分</span>
          <button onClick={() => setScore(s => s + 10)}>➕</button>
        </div>
      </div>
    );
  }
  
  // 4. 主组件使用（可扩展其他学院）
  function Hogwarts() {
    return (
      <Castle>
        <Gryffindor>
          <Student name="哈利" />
        </Gryffindor>
      </Castle>
    );
  }

  export default Hogwarts;