import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';

const wrapper = shallow(<SearchBox />);

describe('SearchBox', () => {
  it('should contain an element with a class .c-search-box', () => {
    expect(wrapper.find('.c-search-box').exists()).toBeTruthy();
  });

  it('should contain an H2 element with a class .c-search-box__title', () => {
    const element = wrapper.find('.c-search-box__title');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('h2');
  });

  it('should contain a SearchField component', () => {
    expect(wrapper.find('SearchField').exists()).toBeTruthy();
  });

  it('should render correctly', () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
