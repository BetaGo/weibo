import axios from 'axios';
import { Dispatch } from 'react-redux';

// API
const API = 'http://127.0.0.1:8080/api/user_info';

// constants
export const LOAD = 'weibo/session/LOAD';
export const LOAD_SUCCESS = 'weibo/session/LOAD_SUCCESS';
export const LOAD_FAIL = 'weibo/session/LOAD_FAIL';

// types
type LOAD = typeof LOAD;
type LOAD_SUCCESS = typeof LOAD_SUCCESS;
type LOAD_FAIL = typeof LOAD_FAIL;

interface SessionLoad {
  type: LOAD;
}
interface SessionLoadSuccess {
  type: LOAD_SUCCESS;
  payload: {};
}
interface SessionLoadFail {
  type: LOAD_FAIL;
  payload: {};
}
export type SessionAction = SessionLoad | SessionLoadSuccess | SessionLoadFail;

export interface SessionState {
  error: {};
  fetchStatus: string;
}

const initialState = {
  error: {},
  fetchStatus: 'loading'
};

export default function reducer(state: SessionState = initialState, action: SessionAction) {
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
  return async (dispatch: Dispatch<SessionAction>) => {
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
