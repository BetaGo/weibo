import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import * as ReactRenderer from 'react-test-renderer';
import Card from './Card';

describe('<Card />', () => {
  test('应该包含<ActionBar />组件', () => {
    const component = ReactRenderer.create(
      <Card
        text="hello"
        name="xiaoming"
        screen_name="小明"
        profile_image_url="src.example.com/xiaoming.jpg"
        attitudes_count={10}
        reposts_count={20}
        comments_count={30}
      />
    );
    const instance = component.root;
    expect(instance.findByType('ActionBar').props.attitudes_count).toBe(10);
  });
});