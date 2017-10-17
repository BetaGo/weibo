import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as nock from 'nock';
import axios from 'axios';
import httpAdapter = require('axios/lib/adapters/http');

// mock response data
import resData from '../../mocks/user_info';

// api
import * as APIs from '../../config/api';

// action types
import {
  LOAD,
  LOAD_SUCCESS
} from './session';

// actions
import {
  loadUserInfo
} from './session';

// reducer
import reducer from './session';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
axios.defaults.adapter = httpAdapter; // 由于 jest 测试环境采用 jsDOM，默认情况下 axios 会采用 XMLHttpRequest 导致网络错误，所以修改为 httpAdapter。

describe('session actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('当获取数据完成后，能正确更改分发action', () => {
    nock(`${APIs.host}:${APIs.port}`)
      .get(APIs.path.userInfo)
      .reply(200, resData);

    const expectedActions = [{
        type: LOAD
      },
      {
        type: LOAD_SUCCESS,
        payload: resData
      }
    ];
    const store = mockStore({});

    return store.dispatch(loadUserInfo()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('应该能正确返回初始state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: {},
      fetchStatus: 'loading'
    });
  });

  test('应该能正确响应 LOAD_SUCCESS', () => {
    expect(reducer({
      error: {},
      fetchStatus: 'loading'
    },             {
      type: LOAD_SUCCESS,
      payload: resData
    })).toEqual({
      error: {},
      fetchStatus: 'loaded',
      ...resData,
    });
  });
});