import { useState } from 'react';
import './PotionExam.css';

/**
 * 魔药考试系统 - 测试以下功能：
 * 1. 显示考题和选项
 * 2. 提交答案验证
 * 3. 显示考试成绩
 */
export default function PotionExam() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 1,
      text: "福灵剂的主要成分是什么？",
      options: [
        { id: 'a', text: "龙的心脏腱索" },
        { id: 'b', text: "凤凰的眼泪" },
        { id: 'c', text: "独角兽的毛发" }
      ],
      correct: 'b'
    }
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    // 模拟API请求延迟
    setTimeout(() => {
      const isCorrect = selectedAnswer === questions[0].correct;
      setScore(isCorrect ? 'O（优秀）' : 'T（巨怪）');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="potion-exam" data-testid="exam-container">
      <h1 className="exam-title">N.E.W.T. 魔药考试</h1>
      
      <div className="question-card">
        <h2>{questions[0].text}</h2>
        <div className="options">
          {questions[0].options.map(option => (
            <label 
              key={option.id}
              className={`option ${selectedAnswer === option.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="potion-question"
                value={option.id}
                onChange={() => setSelectedAnswer(option.id)}
                data-testid={`option-${option.id}`}
              />
              {option.text}
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handleSubmit}
        disabled={!selectedAnswer || isSubmitting}
        className="submit-btn"
        data-testid="submit-btn"
      >
        {isSubmitting ? '批改中...' : '提交答案'}
      </button>

      {score && (
        <div className={`result ${score.includes('O') ? 'pass' : 'fail'}`}>
          考试成绩: <span data-testid="score">{score}</span>
        </div>
      )}
    </div>
  );
}