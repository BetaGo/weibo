import axios from 'axios';
import { Dispatch } from 'react-redux';
import * as APIs from '../../config/api';

// API
const API = APIs.userInfo;

// constants
export const LOAD = 'weibo/session/LOAD';
export const LOAD_SUCCESS = 'weibo/session/LOAD_SUCCESS';
export const LOAD_FAIL = 'weibo/session/LOAD_FAIL';

// types
export type LOAD = typeof LOAD;
export type LOAD_SUCCESS = typeof LOAD_SUCCESS;
export type LOAD_FAIL = typeof LOAD_FAIL;

export interface SessionLoad {
  type: LOAD;
}
export interface SessionLoadSuccess {
  type: LOAD_SUCCESS;
  payload: {};
}
export interface SessionLoadFail {
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
