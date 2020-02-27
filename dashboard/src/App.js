import React from 'react';
import RPMBar from './RPMBar.js';
import { subscribeToCAN } from './CANSubscriber';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rpm: 0.0};
    subscribeToCAN((err, rpm) => this.setState({
      rpm
    }));

    
  }

  render() {
    return (
      <div className="App">
        <RPMBar rpm={this.state.rpm} />
      </div>
    );
  }
}

export default App;
