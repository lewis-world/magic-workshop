// 共享通信总线
export const createPortalBus = () => {
  const listeners = {};
  return {
    on: (event, callback) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
    },
    off: (event, callback) => {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter(cb => cb !== callback);
      }
    },
    emit: (event, data) => {
      if (listeners[event]) {
        listeners[event].forEach(cb => cb(data));
      }
    }
  };
};

export const portalBus = createPortalBus();