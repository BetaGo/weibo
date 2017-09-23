import axios from 'axios';
import { normalize } from 'normalizr';
import { timeline } from '../schema';

// API
const HOME_TIMELINE = 'http://192.168.56.20:8080/api/home_timeline';

// action
const LOAD = 'weibo/tweets/LOAD';
const LOAD_SUCCESS = 'weibo/tweets/LOAD_SUCCESS';
const LOAD_FAIL = 'weibo/tweets/LOAD_FAIL';
const LOAD_NEXT = 'weibo/tweets/LOAD_NEXT';
const LOAD_NEXT_SUCCESS = 'weibo/tweets/LOAD_NEXT_SUCCESS';
const LOAD_NEXT_FAIL = 'weibo/tweets/LOAD_NEXT_FAIL';
const LOAD_SINCE = 'weibo/tweets/LOAD_SINCE';
const LOAD_SINCE_SUCCESS = 'weibo/tweets/LOAD_SINCE_SUCCESS';
const LOAD_SINCE_FAIL = 'weibo/tweets/LOAD_SINCE_FAIL';

const initialState = {
  users: {},
  tweets: {},
  retweet: {},
  statuses: [],
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
        ...action.payload.entities,
        ...action.payload.result
      };
    }
    case LOAD_FAIL: {
      return {
        ...state,
        fetchStatus: 'error',
        error: action.payload
      };
    }

    case LOAD_NEXT: {
      return {
        ...state,
        fetchStatus: 'loading_next'
      };
    }
    case LOAD_NEXT_SUCCESS: {
      const { users, tweets, retweet } = action.payload.entities;
      const { statuses, max_id } = action.payload.result;
      return {
        ...state,
        fetchStatus: 'loaded_next',
        users: { ...state.users, ...users },
        tweets: { ...state.tweets, ...tweets },
        retweet: { ...state.retweet, ...retweet },
        statuses: [...new Set([...state.statuses, ...statuses])],
        max_id
      };
    }
    case LOAD_NEXT_FAIL: {
      return {
        ...state,
        fetchStatus: 'error_next'
      };
    }

    case LOAD_SINCE: {
      return {
        ...state,
        fetchStatus: 'load_next'
      };
    }
    case LOAD_SINCE_SUCCESS: {
      const { users, tweets, retweet } = action.payload.entities;
      const { statuses, since_id } = action.payload.result;
      return {
        ...state,
        fetchStatus: 'loaded_next',
        users: { ...state.users, ...users },
        tweets: { ...state.tweets, ...tweets },
        retweet: { ...state.retweet, ...retweet },
        statuses: [...new Set([...state.statuses, ...statuses])],
        since_id
      };
    }
    case LOAD_SINCE_FAIL: {
      return {
        ...state,
        fetchStatus: 'error_next',
        error: action.payload
      };
    }

    default:
      return state;
  }
}

export function loadHomeTimeline() {
  return async dispatch => {
    dispatch({ type: LOAD });
    try {
      const homeTimeline = await axios.get(HOME_TIMELINE, {
        withCredentials: true
      });

      if (homeTimeline) {
        dispatch({
          type: LOAD_SUCCESS,
          payload: normalize(homeTimeline.data, timeline)
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

export function loadSinceTimeline(since_id) {
  return async dispatch => {
    dispatch({ type: LOAD_SINCE });
    try {
      const sinceTimeline = await axios.get(HOME_TIMELINE, {
        withCredentials: true,
        params: {
          since_id
        }
      });
      if (sinceTimeline) {
        dispatch({
          type: LOAD_SINCE_SUCCESS,
          payload: normalize(sinceTimeline.data, timeline)
        });
      }
    } catch (e) {
      dispatch({
        type: LOAD_SINCE_FAIL,
        payload: e
      });
    }
  };
}

export function loadNextTimeline(max_id) {
  return async dispatch => {
    dispatch({ type: LOAD_NEXT });
    try {
      const nextTimeline = await axios.get(HOME_TIMELINE, {
        withCredentials: true,
        params: {
          max_id
        }
      });
      if (nextTimeline) {
        dispatch({
          type: LOAD_NEXT_SUCCESS,
          payload: normalize(nextTimeline.data, timeline)
        });
      }
    } catch (e) {
      dispatch({
        type: LOAD_NEXT_FAIL,
        payload: e
      });
    }
  };
}
