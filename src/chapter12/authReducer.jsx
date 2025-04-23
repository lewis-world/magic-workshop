const initialState = {
    hasPhoenixBadge: false,
    userInfo: null
  }
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_AUTH_STATUS':
        return {
          ...state,
          hasPhoenixBadge: action.payload
        }
      case 'SET_USER_INFO':
        return {
          ...state,
          userInfo: action.payload
        }
      default:
        return state
    }
  }