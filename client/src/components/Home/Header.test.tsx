import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

import Header from './Header';

describe('<Header />', () => {
  const testRenderer = TestRenderer.create(<Header profile_image_url="example.jpg" />);
  const testInstance = testRenderer.root;
  test('应该包含标题', () => {
    expect(testInstance.findByType('Typography').children).toEqual(['主页']);
  });
});
