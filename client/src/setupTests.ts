//@ts-ignore
async function flushPromises(ms?: number) {
  await new Promise(setImmediate);
}

jest.mock('axios');

jest.mock('react-toastify', () => {
  const actual = jest.requireActual('react-toastify');
  Object.assign(actual, {toast: jest.fn()});
  return actual;
});

function mockComponent(name: string, real: {[key: string]: unknown} = {}) {
  const React = require('React');
  const MockedComponent = class extends React.Component {
    render() {
      return React.createElement(name, this.props, this.props.children);
    }
  };
  for (const prop in real) {
    if (real.hasOwnProperty(prop)) {
      MockedComponent[prop] = real[prop];
    }
  }
  return MockedComponent;
}

//@ts-ignore
global.flushPromises = flushPromises;
