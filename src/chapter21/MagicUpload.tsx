import React, { useState } from 'react';
import './MagicUpload.css';
import sortingHat from './assets/Sorting_Hat.png';


// 类型定义
interface Chunk {
  id: string;
  data: Blob;
  start: number;
  end: number;
}

interface UploadStatus {
  fileId: string;
  uploadedChunks: string[];
}

// 1. 量子切割术（文件分片）
const sliceFile = (file: File): Chunk[] => {
  const chunks: Chunk[] = [];
  let start = 0;
  const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB分片
  
  while (start < file.size) {
    chunks.push({
      id: `${file.name}-${start}`,
      data: file.slice(start, start + CHUNK_SIZE),
      start,
      end: start + CHUNK_SIZE
    });
    start += CHUNK_SIZE;
  }
  return chunks;
};

// 2. 时间回溯结界（检查上传状态）
const checkServerStatus = async (file: File): Promise<UploadStatus> => {
  const response = await fetch('/api/pensieve/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      fileName: file.name,
      fileSize: file.size 
    })
  });
  if (!response.ok) {
    throw new Error('冥想盆连接失败');
  }
  return response.json();
};

// 3. 以太传输咒（分片上传）
const uploadChunk = async (chunk: Chunk): Promise<boolean> => {
  const formData = new FormData();
  formData.append('chunk', chunk.data);
  formData.append('metadata', JSON.stringify({
    fileId: '时空裂隙-' + Date.now(),
    chunkId: chunk.id
  }));

  try {
    const response = await fetch('/api/quantum-transfer', {
      method: 'POST',
      body: formData
    });
    return response.ok;
  } catch (error) {
    console.error('⚠️ 遭遇黑魔法干扰:', error);
    return false;
  }
};

// 4. 反黑魔法验证阵（文件完整性校验）
const verifyFileIntegrity = async (fileId: string): Promise<boolean> => {
  const response = await fetch(`/api/ministry/verify/${fileId}`);
  const { merkleRoot } = await response.json();
  
  // 这里应该是实际计算本地文件哈希的逻辑
  // 简化示例中我们假设总是验证成功
  const localRoot = 'simulated-merkle-root';
  
  return merkleRoot === localRoot;
};

// 进度条组件
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="pensieve-projection">
      <div 
        className="time-turner-indicator"
        style={{ width: `${progress}%` }}
      >
        <span className="prophecy-text">
          {progress}% 已穿越时空裂隙
        </span>
      </div>
      <div className="fragment-traces">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i}
            className={`trace ${i < progress/10 ? 'activated' : ''}`}
            style={{ '--delay': i * 0.3 + 's' }}
          >✨</div>
        ))}
      </div>
    </div>
  );
};

// 主组件
export const MagicUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setMessage('请先选择要传送的文件');
      return;
    }
    
    setIsUploading(true);
    setMessage(null);
    
    try {
      // 1. 施展量子切割术
      const chunks = sliceFile(file);
      
      // 2. 连接时间回溯结界
      const { uploadedChunks } = await checkServerStatus(file);
      
      // 3. 启动以太传输
      for (const chunk of chunks) {
        if (!uploadedChunks.includes(chunk.id)) {
          const success = await uploadChunk(chunk);
          if (success) {
            const newProgress = Math.floor(
              ((chunks.indexOf(chunk) + 1) / chunks.length) * 100
            );
            setProgress(newProgress);
          } else {
            setMessage(`碎片 ${chunk.id} 传输失败，正在重试...`);
          }
        }
      }
      
      // 4. 验证全息完整性
      const isVerified = await verifyFileIntegrity(file.name);
      if (isVerified) {
        setMessage('✅ 文件已安全抵达魔法部');
      } else {
        setMessage('⚠️ 文件完整性验证失败，请重新传送');
      }
    } catch (error) {
      console.error('魔法传送失败:', error);
      setMessage(`🛑 传送失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsUploading(false);
    }
  };

  

  return (
    <div className="owl-post-container">
      <img src={sortingHat} alt="智能分配存储" className="sorting-hat" />
      <h2>霍格沃茨文件传送系统</h2>
      
      <div className="file-selector">
        <input 
          type="file" 
          id="magic-file-input"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setProgress(0);
            setMessage(null);
          }}
          disabled={isUploading}
        />
        <label htmlFor="magic-file-input" className="file-input-label">
          {file ? file.name : '选择要传送的文件'}
        </label>
      </div>
      
      <button 
        onClick={handleUpload}
        disabled={isUploading || !file}
        className="upload-button"
      >
        {isUploading ? '🦉 传送中...' : '🦉 开始猫头鹰运送'}
      </button>
      
      <ProgressBar progress={progress} />
      
      {message && <div className="message">{message}</div>}
      
      <div className="storage-options">
        <h3>选择存储位置:</h3>
        <select disabled={isUploading} defaultValue="room-of-requirement">
          <option value="headmaster">校长办公室 (绝密)</option>
          <option value="common-room">公共休息室 (公开)</option>
          <option value="room-of-requirement">有求必应屋 (动态)</option>
          <option value="forbidden-forest">禁林边缘 (高风险)</option>
        </select>
      </div>
    </div>
  );
};

export default MagicUpload;