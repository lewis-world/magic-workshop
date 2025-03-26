import { useState, useEffect, useCallback, useTransition } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './Hogwarts.css';

const Layout = WidthProvider(RGL);

function Classroom({ children = [] }) {
  const [stairLayout, setStairLayout] = useState(generateRandomLayout());
  
  // 使用 React 19 的 useTransition 优化动画性能
  const [isPending, startTransition] = useTransition();

  // 生成随机楼梯布局（Webpage3 的 react-grid-layout 应用）
  const regenerateLayout = useCallback(() => {
    startTransition(() => {
      // 添加延迟
      return new Promise(resolve => {
        setTimeout(() => {
          setStairLayout(generateRandomLayout());
          resolve();
        }, 500); 
      });
    });
  }, [startTransition]);

  // 自动变换布局的魔法效果（Webpage1 的动画实现思路）
  useEffect(() => {
    const interval = setInterval(() => {
      regenerateLayout();
    }, 10000);
    return () => clearInterval(interval);
  }, [regenerateLayout]);

  // 如果没有子元素，使用默认的楼梯
  const defaultChildren = Array(8).fill(null).map((_, i) => (
    <div key={i} className="stair-content">
      魔法楼梯 {i + 1}
    </div>
  ));

  const displayChildren = children.length > 0 ? children : defaultChildren;

  return (
    <div className="moving-stairs">
      <Layout
        className="stair-container"
        layout={stairLayout}
        cols={6}
        rowHeight={100}
        width={1200}
        margin={[20, 20]}
        onLayoutChange={(layout) => {
          setStairLayout(layout);
        }}
      >
        {displayChildren.map((child, i) => (
          <div 
            key={i} 
            className={`stair ${isPending ? 'transitioning' : ''}`}
            data-grid={{ w: 2, h: 1, x: i%3 * 2, y: Math.floor(i/3) }}
          >
            <div className="stone-texture">
              {child}
              <div className="hover-sparkles"></div>
            </div>
          </div>
        ))}
      </Layout>
      
      <button 
        className="spell-button"
        onClick={() => {
          regenerateLayout();
        }}
        disabled={isPending}
      >
        {isPending ? '楼梯移动中...' : '施展变形咒'}
      </button>
    </div>
  );
}

// 生成随机魔法楼梯布局
function generateRandomLayout() {
  return Array.from({ length: 8 }, (_, i) => ({
    i: i.toString(),
    x: Math.floor(Math.random() * 4) * 2,
    y: Math.floor(Math.random() * 6),
    w: 2,
    h: 1
  }));
}

export default Classroom;