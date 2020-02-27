import React from 'react';
import RPMBar from './RPMBar.js';
import { subscribeToTimer } from './CANListener';

class App extends React.Component {

  constructor(props) {
    super(props);

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));

    
  }

  state = {
    timestamp: 'no timestamp yet'
  };

  
  // add <RPMBar /> below
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
      </div>
    );
  }
}

export default App;
