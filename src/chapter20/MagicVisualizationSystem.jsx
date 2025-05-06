import React, { useState, useEffect, useRef } from 'react';
import './MagicVisualizationSystem.css';

// 本地图片资源
import mapMarker from './assets/map-marker1.png';
import darkMagicBg from './assets/dark-magic-bg.jpg';
import phoenixMapBg from './assets/phoenix-map-bg.jpg';

// ============= 魔法数据 =============
const MagicData = {
  potionSales: [
    { month: '1月', felix: 120, veritaserum: 80, polyjuice: 65 },
    { month: '2月', felix: 135, veritaserum: 75, polyjuice: 70 },
    { month: '3月', felix: 148, veritaserum: 88, polyjuice: 72 },
    { month: '4月', felix: 160, veritaserum: 92, polyjuice: 85 }
  ],
  darkMagicEvents: [
    { lat: 51.505, lng: -0.09, intensity: 28 },
    { lat: 51.51, lng: -0.1, intensity: 15 },
    { lat: 51.515, lng: -0.12, intensity: 8 }
  ],
  orderMembers: [
    { name: '哈利', x: 0, y: 0, z: 0, status: 'active' },
    { name: '赫敏', x: 2, y: 2, z: 0, status: 'active' },
    { name: '罗恩', x: -2, y: 0, z: 1, status: 'inactive' }
  ]
};

// ============= 魔法可视化系统 =============
const MagicVisualizationSystem = () => {
  const [activeTab, setActiveTab] = useState('crystalBall');
  const [libsLoaded, setLibsLoaded] = useState({
    echarts: false,
    leaflet: false,
    heatmap: false,
    three: false
  });

  // 动态加载库
  useEffect(() => {
    const loadScript = (libName, globalVar, url) => {
      if (window[globalVar]) {
        setLibsLoaded(prev => ({ ...prev, [libName]: true }));
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
          // 额外检查确保库已全局可用
          const checkInterval = setInterval(() => {
            if (window[globalVar]) {
              clearInterval(checkInterval);
              setLibsLoaded(prev => ({ ...prev, [libName]: true }));
              resolve();
            }
          }, 100);
        };
        script.onerror = () => {
          console.error(`${libName} 加载失败`);
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    Promise.all([
      loadScript('echarts', 'echarts', 'https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js'),
      loadScript('leaflet', 'L', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'),
      loadScript('heatmap', 'h337', 'https://unpkg.com/heatmap.js@2.0.5/build/heatmap.min.js'),
      loadScript('three', 'THREE', 'https://unpkg.com/three@0.132.2/build/three.min.js')
    ]);

    return () => {
      // 清理全局变量
      ['echarts', 'L', 'h337', 'THREE'].forEach(lib => {
        if (window[lib]) delete window[lib];
      });
    };
  }, []);

  // 1. 预言水晶球 (ECharts)
  const CrystalBall = () => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (!libsLoaded.echarts || !chartRef.current) return;

      const chart = window.echarts.init(chartRef.current);
      const option = {
        title: {
          text: '魔药销售星轨图',
          left: 'center',
          top: '5%',
          textStyle: {
            color: '#FFD700',
            fontSize: 18,
            fontWeight: 'bold',
            textShadow: '0 0 5px #8A2BE2'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: ['福灵剂', '吐真剂'],
          textStyle: { color: '#FFF' },
          top: '15%'
        },
        grid: {
          top: '25%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: MagicData.potionSales.map(d => d.month),
          axisLabel: { 
            color: '#FFF',
            fontSize: 12,
            interval: 0
          },
          axisLine: {
            lineStyle: { color: '#9370DB' }
          }
        },
        yAxis: { 
          type: 'value',
          axisLabel: { color: '#FFF' },
          splitLine: {
            lineStyle: { color: 'rgba(147, 112, 219, 0.2)' }
          }
        },
        series: [
          {
            name: '福灵剂',
            type: 'bar',
            data: MagicData.potionSales.map(d => d.felix),
            itemStyle: { 
              color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#FF8C00' },
                { offset: 1, color: '#FF4500' }
              ])
            },
            barWidth: '40%'
          },
          {
            name: '吐真剂',
            type: 'bar',
            data: MagicData.potionSales.map(d => d.veritaserum),
            itemStyle: { 
              color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#9370DB' },
                { offset: 1, color: '#8A2BE2' }
              ])
            },
            barWidth: '40%'
          }
        ]
      };
      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }, []);

    return <div ref={chartRef} className="chart-container" />;
  };

  // 2. 记忆回廊 (Leaflet)
  const MemoryCorridor = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
      if (!libsLoaded.leaflet || !mapRef.current) return;

      // 创建地图实例
      mapInstance.current = window.L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false,
        boxZoom: false,
        scrollWheelZoom: false,
        // dragging: false,
        keyboard: false
      }).setView([51.505, -0.09], 13);    
      
      // 设置容器背景
      mapRef.current.style.background = `url(${darkMagicBg}) center/cover`;
      
      // 添加标记点
      MagicData.potionSales.forEach((month, idx) => {
        const marker = window.L.marker([51.505 + idx * 0.01, -0.09 + idx * 0.01], {
          icon: window.L.icon({
            iconUrl: mapMarker,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          })
        }).addTo(mapInstance.current);
        
        marker.bindPopup(`
          <div class="map-popup">
            <h3>${month.month}</h3>
            <div class="sales-data">
              <span style="color:#FF8C00">福灵剂: ${month.felix}瓶</span>
              <span style="color:#9370DB">吐真剂: ${month.veritaserum}瓶</span>
            </div>
          </div>
        `);
      });

      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }, []);

    return <div ref={mapRef} className="map-container" />;
  };

  // 3. 摄魂怪预警看板 (Heatmap.js)
  const DementorAlertBoard = () => {
    const heatmapRef = useRef(null);
    const heatmapInstance = useRef(null);

    useEffect(() => {
      if (!libsLoaded.heatmap || !heatmapRef.current) return;

      // 设置容器背景
      heatmapRef.current.style.background = `url(${darkMagicBg}) center/cover`;
      
      // 创建热力图实例
      heatmapInstance.current = window.h337.create({
        container: heatmapRef.current,
        radius: 30,
        maxOpacity: 0.6,
        minOpacity: 0.1,
        blur: 0.8,
        gradient: {
          0.3: 'rgba(0, 0, 255, 0.3)',
          0.5: 'rgba(0, 255, 255, 0.5)',
          0.7: 'rgba(0, 255, 0, 0.7)',
          0.9: 'rgba(255, 255, 0, 0.9)',
          1.0: 'rgba(255, 0, 0, 1)'
        }
      });

      // 设置热力图数据
      const heatData = {
        data: MagicData.darkMagicEvents.map(event => ({
          x: Math.floor((event.lng + 0.12) * 500),
          y: Math.floor((event.lat - 51.505) * 500),
          value: event.intensity
        }))
      };
      heatmapInstance.current.setData(heatData);

      return () => {
        heatmapInstance.current = null;
      };
    }, []);

    return <div ref={heatmapRef} className="heatmap-container" />;
  };

  // 4. 凤凰社决策大屏 (Three.js)
  const OrderOfPhoenixMap = () => {
    const threeRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const memberMeshesRef = useRef([]);
    const raycasterRef = useRef(new window.THREE.Raycaster());
    const mouseRef = useRef(new window.THREE.Vector2());
    const animationIdRef = useRef(null);
  
    useEffect(() => {
      if (!libsLoaded.three || !threeRef.current) return;
  
      // 初始化场景
      const scene = new window.THREE.Scene();
      sceneRef.current = scene;
  
      // 设置背景（使用透明背景叠加CSS背景图）
      threeRef.current.style.background = `url(${phoenixMapBg}) center/cover no-repeat`;
      threeRef.current.style.position = 'relative';
  
      // 初始化相机
      const camera = new window.THREE.PerspectiveCamera(
        75,
        threeRef.current.clientWidth / threeRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 8;
      cameraRef.current = camera;
  
      // 初始化渲染器（透明背景）
      const renderer = new window.THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(threeRef.current.clientWidth, threeRef.current.clientHeight);
      rendererRef.current = renderer;
      threeRef.current.appendChild(renderer.domElement);
  
      // 光源设置
      const ambientLight = new window.THREE.AmbientLight(0x404040, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new window.THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(2, 2, 3);
      scene.add(directionalLight);
  
      // 添加魔法光晕（点光源）
      const pointLight = new window.THREE.PointLight(0xFF8C00, 1, 10);
      pointLight.position.set(0, 0, 2);
      scene.add(pointLight);
  
      // 创建成员标记
      memberMeshesRef.current = MagicData.orderMembers.map(member => {
        const geometry = new window.THREE.SphereGeometry(0.3, 32, 32);
        const material = new window.THREE.MeshPhongMaterial({ 
          color: member.status === 'active' ? 0xFF4500 : 0x9370DB,
          shininess: 100,
          emissive: member.status === 'active' ? 0xFF4500 : 0x9370DB,
          emissiveIntensity: 0.3
        });
        const sphere = new window.THREE.Mesh(geometry, material);
        sphere.position.set(member.x, member.y, member.z);
        sphere.userData = member; // 存储成员数据
        scene.add(sphere);
        return sphere;
      });
  
      // 添加连接线（凤凰社成员之间的连线）
      const lineMaterial = new window.THREE.LineBasicMaterial({ 
        color: 0xFFD700,
        transparent: true,
        opacity: 0.6 
      });
      
      const points = MagicData.orderMembers.map(m => new window.THREE.Vector3(m.x, m.y, m.z));
      const lineGeometry = new window.THREE.BufferGeometry().setFromPoints(points);
      const line = new window.THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
  
      // 鼠标移动事件（用于射线检测）
      const handleMouseMove = (event) => {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);
  
      // 点击事件
      const handleClick = () => {
        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(memberMeshesRef.current);
        
        if (intersects.length > 0) {
          const member = intersects[0].object.userData;
          console.log('选中成员:', member.name);
          // 这里可以触发弹窗或其他UI交互
        }
      };
      window.addEventListener('click', handleClick);
  
      // 动画逻辑
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
  
        // 整体缓慢旋转
        scene.rotation.y += 0.002;
  
        // 成员标记脉冲动画
        memberMeshesRef.current.forEach(mesh => {
          mesh.scale.x = 1 + Math.sin(Date.now() * 0.002) * 0.1;
          mesh.scale.y = 1 + Math.sin(Date.now() * 0.002) * 0.1;
          
          // 活跃成员更强烈的动画
          if (mesh.userData.status === 'active') {
            mesh.material.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.003) * 0.5;
          }
        });
  
        renderer.render(scene, camera);
      };
      animate();
  
      // 响应式调整
      const handleResize = () => {
        camera.aspect = threeRef.current.clientWidth / threeRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(threeRef.current.clientWidth, threeRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
        cancelAnimationFrame(animationIdRef.current);
        if (rendererRef.current?.domElement) {
          rendererRef.current.domElement.remove();
        }
      };
    }, []);
  
    return (
      <div 
        ref={threeRef} 
        className="three-container" 
        style={{ 
          width: '100%', 
          height: '600px',
          borderRadius: '10px',
          overflow: 'hidden'
        }} 
      />
    );
  };

  // 检查所有必要库是否加载完成
  const allLibsLoaded = Object.values(libsLoaded).every(Boolean);

  // 加载状态
  if (!allLibsLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner">✨</div>
          <h2>正在准备魔法世界...</h2>
          <div className="loading-status">
            {Object.entries(libsLoaded).map(([libName, isLoaded]) => (
              <div key={libName} className="status-item">
                <span className="status-label">
                  {{
                    echarts: '预言水晶球',
                    leaflet: '记忆回廊',
                    heatmap: '摄魂怪预警',
                    three: '凤凰社地图'
                  }[libName]}:
                </span>
                <span className="status-value">
                  {isLoaded ? '✅ 魔法就绪' : '⏳ 施法中...'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="magic-dashboard">
      <h1 className="dashboard-title">
        霍格沃茨魔法数据可视化系统
      </h1>
      
      <div className="tab-buttons">
        {[
          { id: 'crystalBall', icon: '🔮', label: '预言水晶球' },
          { id: 'memoryCorridor', icon: '⏳', label: '记忆回廊' },
          { id: 'dementorAlert', icon: '⚠️', label: '摄魂怪预警' },
          { id: 'phoenixMap', icon: '🦉', label: '凤凰社地图' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="visualization-container">
        {activeTab === 'crystalBall' && <CrystalBall />}
        {activeTab === 'memoryCorridor' && <MemoryCorridor />}
        {activeTab === 'dementorAlert' && <DementorAlertBoard />}
        {activeTab === 'phoenixMap' && <OrderOfPhoenixMap />}
      </div>
    </div>
  );
};

export default MagicVisualizationSystem;