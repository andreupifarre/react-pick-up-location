import React from 'react';
import { shallow } from 'enzyme';
import SearchList from './SearchList';

const render = props => shallow(<SearchList {...props} />);

describe('SearchList', () => {
  it('should contain an ol element with a role and a class .c-search-list__list', () => {
    const element = render().find('.c-search-list__list');
    expect(element.exists()).toBeTruthy();
    expect(element.name()).toEqual('ol');
    expect(element.prop('role')).toEqual('listbox');
  });

  it('should display a "No results found" message if no results where found', () => {
    const props = { locations: [], noResults: true };
    const element = render(props).find('.c-search-list__nores');
    expect(element.exists()).toBeTruthy();
  });

  it('should render list items correctly when locations array has items', () => {
    const props = {
      locations: [
        { index: 1, name: 'foo', iata: 'BCN' },
        { index: 2, name: 'bar', iata: 'MAD' },
      ],
      noResults: false,
    };

    const items = render(props).find('.c-search-list__item');
    expect(items.length).toEqual(props.locations.length);

    const propsFlat = props.locations.map(
      ({ name, iata }) => `${name} (${iata})`,
    );

    const newItems = items.map(item =>
      item
        .find('.c-search-list__location-name')
        .text()
        .trim(),
    );
    expect(newItems).toEqual(propsFlat);
  });

  it('should display a screen reader text indicating the results found', () => {
    const props = { locations: [{ index: 1 }], noResults: false };
    const element = render(props).find('.c-search-list__reader-inst');
    expect(element.exists()).toBeTruthy();
  });

  it('should render correctly', () => {
    expect(render().getElements()).toMatchSnapshot();
  });
});
