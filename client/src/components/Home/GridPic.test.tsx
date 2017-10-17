import * as React from 'react';
import { mount } from 'enzyme';

import GridPic from './GridPic';

// 测试用例
const pics = [
  'http://example1.jpg',
  'http://example2.jpg',
  'http://example3.jpg',
  'http://example4.jpg',
  'http://example5.jpg',
];

describe('<GridPic />', () => {
  test('应该能正确地渲染出图片', () => {
    expect(mount(<GridPic pics={pics} />).find('img')).toHaveLength(pics.length);
  });
});