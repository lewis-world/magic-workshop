import { useState, useEffect } from 'react';

const withMagicAmplifier = (BaseComponent) => {
  return function AmplifiedComponent(props) {
    const [magicLevel, setMagicLevel] = useState(100);

    useEffect(() => {
      const interval = setInterval(() => {
        setMagicLevel(prev => Math.min(prev + 10, 200));
      }, 5000);

      return () => clearInterval(interval);
    }, []);

    return <BaseComponent {...props} magic={magicLevel} />;
  };
};

const BasicSpell = ({ magic }) => (
  <div>当前魔力等级: {magic}</div>
);

const EnhancedSpell = withMagicAmplifier(BasicSpell);

export default EnhancedSpell;