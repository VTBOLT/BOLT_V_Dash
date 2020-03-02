import React from 'react';
import RPMBar from './RPMBar/RPMBar.js';
import SOCBar from './SOCBar/SOCBar';
import { subscribeToCAN } from './CANSubscriber';

class App extends React.Component {

  constructor(props) {
    super(props);
    subscribeToCAN();    
  }

  render() {
    return (
      <div className="App">
        <RPMBar />
        <SOCBar />
      </div>
    );
  }
}

export default App;
