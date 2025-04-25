export default function TimeTurner() {
    return (
      <div className="time-turner-ui" style={{
        background: 'radial-gradient(circle, #f5f5dc, #d4af37)',
        padding: '2rem',
        borderRadius: '50%',
        width: '200px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px gold',
        margin: '0 auto'
      }}>
        <div className="hourglass">⏳</div>
        <h3>时间转换器</h3>
        <p>当前时间: {new Date().toLocaleTimeString()}</p>
      </div>
    );
  }