import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('displays text correctly', () => {
    const wrapper = shallow(<App />);
    const text = (
      <a
        className="App-link"
        href="https://reactjs.org"
        id="appLinkId"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    );
    expect(wrapper).toContainReact(text);
  });

  it('displays the exampleComponent', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('ExampleComponent').prop('id')).toEqual('exampleComponentId');
  });
});
