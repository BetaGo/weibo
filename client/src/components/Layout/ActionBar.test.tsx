import * as React from 'react';
import { shallow } from 'enzyme';

import ActionBar from './ActionBar';

describe('<ActionBar />', () => {
  test('应该有4个按钮', () => {
    expect(shallow(<ActionBar />).find('Tab')).toHaveLength(4);
  });
});