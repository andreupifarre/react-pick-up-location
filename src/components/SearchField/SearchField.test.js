import React from 'react';
import { shallow } from 'enzyme';

import SearchField from './SearchField';
import useDebounce from '../../hooks/useDebounce';
import useFetchData from '../../hooks/useFetchData';

jest.mock('../../hooks/useDebounce');
jest.mock('../../hooks/useFetchData');

useDebounce.mockReturnValue('');
useFetchData.mockReturnValue([[], false]);

const render = () => shallow(<SearchField />);

afterEach(() => {
  jest.clearAllMocks();
});

describe('SearchField', () => {
  it('should contain a parent element with a class .c-search-field', () => {
    const element = render().find('.c-search-field');
    expect(element.exists()).toBeTruthy();
  });

  it('should contain a label element with a class .c-search-field__label', () => {
    const element = render().find('.c-search-field__label');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('label');
  });

  it('should contain an input field with a class .c-search-field__input', () => {
    const element = render().find('.c-search-field__input');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('input');
  });

  it('should have accessibility and other required attributes', () => {
    const element = render().find('.c-search-field__input');
    expect(element.props()).toEqual({
      ...element.props(),
      onBlur: expect.any(Function),
      onFocus: expect.any(Function),
      onChange: expect.any(Function),
      placeholder: 'city, airport, station, region, district…',
      autoComplete: 'off',
      'aria-required': 'true',
      'aria-autocomplete': 'list',
      'aria-haspopup': 'true',
    });
  });

  it('should contain a SearchList component', () => {
    const wrapper = render();
    wrapper.find('input').simulate('focus');

    const element = wrapper.find('SearchList');
    expect(element.exists()).toBeTruthy();
    expect(element.prop('locations')).toBeDefined();
  });

  it('should pass the correct object to SearchList location property on input focus', () => {
    const wrapper = render();
    const locations = [
      { index: 1, name: 'foo', iata: 'BCN' },
      { index: 2, name: 'bar', iata: 'MAD' },
    ];
    useFetchData.mockReturnValue([locations, false]);
    wrapper.find('input').simulate('focus');
    expect(wrapper.find('SearchList').prop('locations')).toEqual(locations);
  });

  it('should render correctly', () => {
    expect(render().getElements()).toMatchSnapshot();
  });
});
