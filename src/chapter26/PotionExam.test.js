import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PotionExam from './PotionExam';
import '@testing-library/jest-dom';

describe('魔药考试系统', () => {
  // 测试1：初始渲染检查
  test('正确显示考题和选项', () => {
    render(<PotionExam />);
    
    // 验证标题和问题显示
    expect(screen.getByText('N.E.W.T. 魔药考试')).toBeInTheDocument();
    expect(screen.getByText('福灵剂的主要成分是什么？')).toBeInTheDocument();
    
    // 验证选项存在
    expect(screen.getByTestId('option-a')).toBeInTheDocument();
    expect(screen.getByTestId('option-b')).toBeInTheDocument();
    expect(screen.getByTestId('option-c')).toBeInTheDocument();
    
    // 提交按钮初始应为禁用状态
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
  });

  // 测试2：选择答案后的交互
  test('选择答案后激活提交按钮', () => {
    render(<PotionExam />);
    
    // 选择B选项（正确答案）
    fireEvent.click(screen.getByTestId('option-b'));
    
    // 验证按钮状态
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  // 测试3：提交答案后的结果展示
  test('提交正确答案显示O成绩', async () => {
    render(<PotionExam />);
    
    // 选择并提交正确答案
    fireEvent.click(screen.getByTestId('option-b'));
    fireEvent.click(screen.getByTestId('submit-btn'));
    
    // 延长等待时间并添加中间状态断言
    await waitFor(() => {
      expect(screen.getByTestId('submit-btn')).toHaveTextContent('批改中...');
    }, { timeout: 2000 });

    // 检查最终结果
    await waitFor(() => {
      expect(screen.getByTestId('score')).toBeInTheDocument();
      expect(screen.getByTestId('score')).toHaveTextContent('O（优秀）');
    }, { timeout: 2000 });
  });

  // 测试4：错误答案场景
  test('提交错误答案显示T成绩', async () => {
    render(<PotionExam />);
    
    // 选择并提交错误答案
    fireEvent.click(screen.getByTestId('option-a'));
    fireEvent.click(screen.getByTestId('submit-btn'));
    
    await waitFor(() => {
      expect(screen.queryByText('批改中...')).toBeInTheDocument();
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByTestId('score')).toHaveTextContent('T（巨怪）');
    }, { timeout: 2000 });
  });

  // 测试5：界面保持不变
  test('魔药考试系统界面保持不变', () => {  
    const { container } = render(<PotionExam />);  
    expect(container).toMatchSnapshot();  
  });  
});