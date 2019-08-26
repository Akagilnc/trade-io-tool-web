import * as React from 'react';
import { render } from 'react-dom';

interface Props {
  name: string;
}

class App extends React.Component<Props> {
  render() {
    return <div>Hello, {this.props.name}!</div>;
  }
}

var mountNode = document.getElementById('app');

render(<App name="Trade port" />, mountNode);
