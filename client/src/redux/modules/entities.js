import axios from 'axios';
import { normalize } from 'normalizr';
import { timeline } from '../schema';

const LOAD = 'weibo/tweets/LOAD';
const LOAD_SUCCESS = 'weibo/tweets/LOAD_SUCCESS';
const LOAD_FAIL = 'weibo/tweets/LOAD_FAIL';

const initialState = {
  users: {},
  tweets: {},
  retweet: {},
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

export function load() {
  return async dispatch => {
    dispatch({ type: LOAD });
    try {
      const homeTimeline = await axios.get(
        'http://192.168.56.20:8080/api/home_timeline',
        { withCredentials: true }
      );

      if (homeTimeline) {
        dispatch({
          type: LOAD_SUCCESS,
          payload: normalize(homeTimeline.data, timeline).entities
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
