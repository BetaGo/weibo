import axios from 'axios';
import { normalize } from 'normalizr';
import { Dispatch } from 'react-redux';
import { timeline } from '../schema';
import * as APIs from '../../config/api';

// API
const API = APIs.homeTimeline;

// constants
const LOAD = 'weibo/tweets/LOAD';
const LOAD_SUCCESS = 'weibo/tweets/LOAD_SUCCESS';
const LOAD_FAIL = 'weibo/tweets/LOAD_FAIL';
const LOAD_NEXT = 'weibo/tweets/LOAD_NEXT';
const LOAD_NEXT_SUCCESS = 'weibo/tweets/LOAD_NEXT_SUCCESS';
const LOAD_NEXT_FAIL = 'weibo/tweets/LOAD_NEXT_FAIL';
const LOAD_SINCE = 'weibo/tweets/LOAD_SINCE';
const LOAD_SINCE_SUCCESS = 'weibo/tweets/LOAD_SINCE_SUCCESS';
const LOAD_SINCE_FAIL = 'weibo/tweets/LOAD_SINCE_FAIL';

// types
type LOAD = typeof LOAD;
type LOAD_SUCCESS = typeof LOAD_SUCCESS;
type LOAD_FAIL = typeof LOAD_FAIL;
type LOAD_NEXT = typeof LOAD_NEXT;
type LOAD_NEXT_SUCCESS = typeof LOAD_NEXT_SUCCESS;
type LOAD_NEXT_FAIL = typeof LOAD_NEXT_FAIL;
type LOAD_SINCE = typeof LOAD_SINCE;
type LOAD_SINCE_SUCCESS = typeof LOAD_SINCE_SUCCESS;
type LOAD_SINCE_FAIL = typeof LOAD_SINCE_FAIL;

export interface Tweet {
  id: number;
  text: string;
  textLength: number;
  user: number;
  reposts_count: number;
  comments_count: number;
  attitudes_count: number;
}

export interface Tweets {
  [propName: string]: Tweet;
}

export interface User {
  id: number;
  screen_name: string;
  name: string;
  profile_image_url: string;

}

export interface Users {
  [propName: string]: User;
}
export interface TweetsPayload {
  entities: {
    users: {};
    tweets: Tweets;
    retweet: {};
  };
  result: {
    statuses: Array<number>;
    since_id: number;
    max_id: number;
  };
}
interface TweetsLoad {
  type: LOAD;
}
interface TweetsLoadSuccess {
  type: LOAD_SUCCESS;
  payload: TweetsPayload;
}
interface TweetsLoadFail {
  type: LOAD_FAIL;
  payload: {};
}

interface SinceLoad {
  type: LOAD_SINCE;
}
interface SinceLoadSuccess {
  type: LOAD_SINCE_SUCCESS;
  payload: TweetsPayload;
}
interface SinceLoadFail {
  type: LOAD_SINCE_FAIL;
  payload: {};
}

interface NextLoad {
  type: LOAD_NEXT;
}
interface NextLoadSuccess {
  type: LOAD_NEXT_SUCCESS;
  payload: TweetsPayload;
}
interface NextLoadFail {
  type: LOAD_NEXT_FAIL;
  payload: {};
}

export type EntitiesAction = TweetsLoad | TweetsLoadSuccess | TweetsLoadFail |
                      SinceLoad | SinceLoadSuccess | SinceLoadFail |
                      NextLoad | NextLoadSuccess | NextLoadFail;

export interface EntitiesState {
  users: {};
  tweets: {};
  retweet: {};
  statuses: Array<number>;
  since_id: number;
  max_id: number;
  error: {};
  fetchStatus: string;
}

const initialState = {
  users: {},
  tweets: {},
  retweet: {},
  statuses: new Array,
  error: {},
  fetchStatus: 'loading',
  since_id: 0,
  max_id: 0,
};

export default function reducer(state: EntitiesState = initialState, action: EntitiesAction) {
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
        statuses: [...state.statuses, ...statuses].filter((value, index, arr) => arr.indexOf(value) !== index),
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
        statuses: [...state.statuses, ...statuses].filter((value, index, arr) => arr.indexOf(value) !== index),
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
  return async (dispatch: Dispatch<EntitiesAction>) => {
    dispatch({ type: LOAD });
    try {
      const homeTimeline = await axios.get(API, {
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

export function loadSinceTimeline(sinceId: number) {
  return async (dispatch: Dispatch<EntitiesAction>) => {
    dispatch({ type: LOAD_SINCE });
    try {
      const sinceTimeline = await axios.get(API, {
        withCredentials: true,
        params: {
          since_id: sinceId
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

export function loadNextTimeline(maxId: number) {
  return async (dispatch: Dispatch<EntitiesAction>) => {
    dispatch({ type: LOAD_NEXT });
    try {
      const nextTimeline = await axios.get(API, {
        withCredentials: true,
        params: {
          max_id: maxId
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
