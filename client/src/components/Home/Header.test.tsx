import * as React from 'react';
// import * as TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Header from './Header';

describe('<Header />', () => {
  test('要有一个地址正确的头像', () => {
    expect(mount(<Header profile_image_url="example.jpg" />).find(Avatar).prop('src')).toBe('example.jpg');
  });
  test('要有一个名为“主页”标题', () => {
    expect(mount(<Header profile_image_url="example.jpg" />).find(Typography).text()).toBe('主页');
  });
});

// const testRenderer = TestRenderer.create(<Header profile_image_url="example.jpg" />);
// const testInstance = testRenderer.root;
// test('应该包含标题', () => {
//   expect(testInstance.findByProps({type: 'title'}).children).toEqual(['主页']);
// });
// describe('<Header />', () => {
//   test('应该有头像，并且头像地址应该正确传入', () => {
//     expect(testInstance.findByProps({alt: 'avatar'}).props.src).toBe('example.jpg');
//   });
// });
