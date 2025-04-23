import { useState, useEffect } from 'react';

const withTimeTurner = (BaseComponent, fetchData) => {
  return function PreloadedComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadData = async () => {
        try {
          const result = await fetchData(props.timeCoordinate);
          setData(result);
        } catch (error) {
          console.error("冥想盆提取失败:", error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [props.timeCoordinate]);

    if (loading) return <div className="time-turner-spinner">加载中...</div>;
    if (!data) return <div>记忆提取失败</div>;

    return <BaseComponent {...props} data={data} />;
  };
};

const fetchMemory = async (timeCoord) => {
  // API call simulation
  return { memory: `在${timeCoord}的记忆` };
};

const MemoryViewer = ({ data }) => (
  <div>提取的记忆: {data.memory}</div>
);

const EnhancedViewer = withTimeTurner(MemoryViewer, fetchMemory);
export default EnhancedViewer;