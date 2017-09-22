import axios from 'axios';
import { normalize } from 'normalizr';
import { emotionList } from '../schema';

const LOAD = 'weibo/emotions/LOAD';
const LOAD_SUCCESS = 'weibo/emotions/LOAD_SUCCESS';
const LOAD_FAIL = 'weibo/emotions/LOAD_FAIL';

const initialState = {
  entities: {},
  result: [],
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
  return async dispatch => {
    dispatch({ type: LOAD });
    try {
      const emotions = await axios.get(
        'http://192.168.56.20:8080/api/emotions',
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
