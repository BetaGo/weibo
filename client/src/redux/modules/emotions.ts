import axios from 'axios';
import { normalize } from 'normalizr';
import { Dispatch } from 'react-redux';
import { emotionList } from '../schema';

// API
const API = 'http://127.0.0.1:8080/api/emotions';

// constants
export const LOAD = 'weibo/emotions/LOAD';
export const LOAD_SUCCESS = 'weibo/emotions/LOAD_SUCCESS';
export const LOAD_FAIL = 'weibo/emotions/LOAD_FAIL';

// types
export type LOAD = typeof LOAD;
export type LOAD_SUCCESS = typeof LOAD_SUCCESS;
export type LOAD_FAIL = typeof LOAD_FAIL;

export interface EmotionsLoad {
  type: LOAD;
  payload: {};
}

export interface EmotionsLoadSuccess {
  type: LOAD_SUCCESS;
  payload: {};
}

export interface EmotionsLoadFail {
  type: LOAD_FAIL;
  payload: {};
}

export type EmotionsAction = EmotionsLoad | EmotionsLoadSuccess | EmotionsLoadFail;

export interface Emotion {
  phrase: string;
  type: string;
  url: string;
  hot: boolean;
  common: boolean;
  category: string;
  icon: string;
  value: string;
  picid: string;
}

export interface EmotionsEntities {
  emotions: {[propName: string]: Emotion};
}

export interface EmotionsState {
  entities: EmotionsEntities;
  result: Array<string>;
  error: Object;
  fetchStatus: string;
}

const initialState: EmotionsState = {
  entities: {
    emotions: {}
  },
  result: [],
  error: {},
  fetchStatus: 'loading'
};

export default function reducer(state: EmotionsState = initialState, action: EmotionsAction) {
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
        ...action.payload,
        fetchStatus: 'loaded'
      };
    }

    case LOAD_FAIL: {
      return {
        ...state,
        ...action.payload,
        fetchStatus: 'error'
      };
    }

    default:
      return state;
  }
}

export function loadEmotions() {
  return async (dispatch: Dispatch<EmotionsAction>) => {
    dispatch({ type: LOAD });
    try {
      const emotions = await axios.get(
        API,
        { withCredentials: true }
      );

      if (emotions) {
        dispatch({
          type: LOAD_SUCCESS,
          payload: normalize(emotions.data, emotionList)
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
