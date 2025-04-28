import { BrowserRouter, Routes, Route, Outlet, useNavigate, NavLink } from 'react-router';
import { useState, useEffect, Suspense } from 'react';

// ===== 魔法钩子实现 ===== //

// 1. 飞路粉认证钩子
const useMagicAuth = () => {
  const [isLogin, setIsLogin] = useState(() => {
    // 开发环境自动登录
    if (process.env.NODE_ENV === 'development') {
      localStorage.setItem('phoenix_token', 'expelliarmus');
      return true;
    }
    return localStorage.getItem('phoenix_token') === 'expelliarmus';
  });

  const login = (password) => {
    if (password === 'nitwit_blubber_oddment') {
      localStorage.setItem('phoenix_token', 'expelliarmus');
      setIsLogin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('phoenix_token');
    setIsLogin(false);
  };

  return { isLogin, login, logout };
};

// 2. 分院帽钩子
const useSortingHat = () => {
  const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
  const [house, setHouse] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHouse(houses[Math.floor(Math.random() * 4)]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return { house };
};

// 3. 模拟数据加载钩子
const useMockLoaderData = (loader) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await loader();
        setData(result);
      } catch (err) {
        console.error('冥想盆数据读取失败:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [loader]);

  return { data, loading };
};

// 4. 页面离开守卫钩子
const useMockBeforeUnload = (shouldWarn) => {
  useEffect(() => {
    const handler = (e) => {
      if (shouldWarn()) {
        e.preventDefault();
        e.returnValue = '你有未保存的魔法笔记！';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [shouldWarn]);
};

// ===== 守卫组件 ===== //
const PrivateRoute = () => {
  const { isLogin } = useMagicAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isLogin]);
  return isLogin ? <Outlet /> : null;
};

const RoleGuard = ({ roles }) => {
  const { house } = useSortingHat();
  
  if (!house) return <div className="sorting-hat">分院帽思考中...</div>;
  
  return roles.includes(house) 
    ? <Outlet /> 
    : <div className="spell-blocked">⚠️ {house}学生禁止入内！</div>;
};

// ===== 页面组件 ===== //
const MainHall = () => {
  const { isLogin, logout } = useMagicAuth();
  const { house } = useSortingHat();

  return (
    <div className="main-hall">
      <header className="hogwarts-header">
        <h1>✨ 霍格沃茨魔法导航 ✨</h1>
        {isLogin && (
          <div className="user-panel">
            <span className="house-badge">{house || '分院中...'}</span>
            <button className="logout-btn" onClick={logout}>
              <span className="floo-powder-icon">✧</span> 退出飞路网
            </button>
          </div>
        )}
      </header>
      
      <nav className="magic-nav">
        <NavLink to="/" className={({isActive}) => 
          isActive ? "nav-link active" : "nav-link"
        }>
          🏰 公共休息室
        </NavLink>
        
        {isLogin && (
          <>
            <NavLink to="/potions" className={({isActive}) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              🧪 魔药课
            </NavLink>
            
            <NavLink to="/time-notes" className={({isActive}) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              ⏳ 时间笔记
            </NavLink>

            {(house === 'Slytherin' || house === 'Ravenclaw') && (
              <NavLink to="/dark-arts" className={({isActive}) => 
                isActive ? "nav-link active" : "nav-link"
              }>
                📖 黑魔法防御
              </NavLink>
            )}
          </>
        )}
      </nav>

      <main className="magic-content">
        <Outlet />
      </main>
    </div>
  );
};

const CommonRoom = () => (
  <div className="common-room">
    <h2>🛋️ 公共休息室</h2>
    <p>欢迎来到霍格沃茨！请使用飞路粉认证进入其他区域。</p>
  </div>
);

const PotionClass = () => {
  const { data: potions, loading } = useMockLoaderData(async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      { id: 1, name: "福灵剂", effect: "带来好运", difficulty: 5 },
      { id: 2, name: "复方汤剂", effect: "变身他人", difficulty: 3 }
    ];
  });

  if (loading) return <div className="potion-brewing">魔药正在调制中...</div>;

  return (
    <div className="potion-room">
      <h2>🧪 高级魔药课</h2>
      <ul>
        {potions.map(potion => (
          <li key={potion.id}>
            <strong>{potion.name}</strong>: {potion.effect} 
            <span>难度: {Array(potion.difficulty).fill('★').join('')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TimeTurnerEditor = () => {
  const [notes, setNotes] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  useMockBeforeUnload(() => isDirty);

  return (
    <div className="time-turner">
      <h2>⏳ 时间转换器笔记</h2>
      <textarea 
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setIsDirty(true);
        }}
        placeholder="记录时间穿越注意事项..."
      />
      <button onClick={() => setIsDirty(false)}>保存笔记</button>
    </div>
  );
};

const SpellBook = () => (
  <div className="spell-book">
    <h2>📖 黑魔法防御术</h2>
    <ul>
      <li>除你武器 - Expelliarmus</li>
      <li>盔甲护身 - Protego</li>
      <li>呼神护卫 - Expecto Patronum</li>
    </ul>
  </div>
);

const FlooPowderAuth = () => {
  const [password, setPassword] = useState('');
  const { login } = useMagicAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(password)) {
      navigate('/');
    } else {
      alert('密语错误！试试"nitwit_blubber_oddment"');
    }
  };

  return (
    <div className="floo-powder">
      <h3>🔥 飞路粉认证</h3>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="说出密语"
      />
      <button onClick={handleLogin}>认证</button>
    </div>
  );
};

// ===== 完整应用 ===== //
export const HogwartsRouter = () => {
  return (
    <BrowserRouter>
      <div className="hogwarts-theme">
        <Routes>
          <Route path="/" element={<MainHall />}>
          <Route index element={<CommonRoom />} />
            
            <Route element={<PrivateRoute />}>
              <Route path="potions" element={
                <Suspense fallback={<div className="magic-loading">正在召唤魔药配方...</div>}>
                  <PotionClass />
                </Suspense>
              } />
              
              <Route element={<RoleGuard roles={['Slytherin', 'Ravenclaw']} />}>
                <Route path="dark-arts" element={<SpellBook />} />
              </Route>

              <Route path="time-notes" element={<TimeTurnerEditor />} />
            </Route>

            <Route path="/login" element={<FlooPowderAuth />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};