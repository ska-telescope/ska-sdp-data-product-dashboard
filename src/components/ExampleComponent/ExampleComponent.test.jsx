import React from 'react';
import { shallow } from 'enzyme';
import ExampleComponent from './ExampleComponent';

describe('Example Component', () => {
  it('renders without crashing', () => {
    shallow(<ExampleComponent />);
  });
});
