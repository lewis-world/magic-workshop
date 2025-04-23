import { useSelector } from 'react-redux';

const withDementorDefense = (ProtectedComponent) => {
  return function AuthWrapper(props) {
    const hasPermission = useSelector(state => state.auth.hasPhoenixBadge);
    
    if (!hasPermission) {
      return <div>⚠️ 未通过黑魔法防御术考核！</div>;
    }

    return <ProtectedComponent {...props} />;
  };
};

// Usage:
const MaraudersMap = () => (
  <div>活点地图秘密内容</div>
);

const ProtectedMap = withDementorDefense(MaraudersMap);
export default ProtectedMap;