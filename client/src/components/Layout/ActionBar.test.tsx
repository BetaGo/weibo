import * as React from 'react';
import { mount } from 'enzyme';

import ActionBar from './ActionBar';

describe('<ActionBar />', () => {
  test('应该有4个按钮', () => {
    expect(mount(<ActionBar />).find('Tab')).toHaveLength(4);
  });
});