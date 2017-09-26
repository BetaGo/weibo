import axios from 'axios';

// API
const API = 'http://127.0.0.1:8080/api/user_info';

const LOAD = 'weibo/session/LOAD';
const LOAD_SUCCESS = 'weibo/session/LOAD_SUCCESS';
const LOAD_FAIL = 'weibo/session/LOAD_FAIL';

const initialState = {
  error: {},
  fetchStatus: 'loading'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        fetchStatus: 'loading'
      };
    }

    case LOAD_SUCCESS: {
      return {
        ...state,
        fetchStatus: 'loaded',
        ...action.payload
      };
    }

    case LOAD_FAIL: {
      return {
        ...state,
        fetchStatus: 'error',
        error: action.payload
      };
    }

    default:
      return state;
  }
}

export function loadUserInfo() {
  return async dispatch => {
    dispatch({ type: LOAD });
    try {
      const userInfo = await axios.get(API, { withCredentials: true });

      if (userInfo) {
        dispatch({
          type: LOAD_SUCCESS,
          payload: userInfo.data
        });
      } else {
        dispatch({
          type: LOAD_FAIL,
          payload: '奇怪的错误'
        });
      }
    } catch (e) {
      dispatch({
        type: LOAD_FAIL,
        payload: e
      });
    }
  };
}
