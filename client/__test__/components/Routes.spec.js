import React from 'react';

import Routes from '../../src/routes';

describe('Routes', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});
