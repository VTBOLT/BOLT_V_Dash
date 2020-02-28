import React from 'react';
import RPMBar from './RPMBar.js';
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
      </div>
    );
  }
}

export default App;
