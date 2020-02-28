import React from 'react';
import RPMBar from './RPMBar.js';
import { subscribeToCAN } from './CANSubscriber';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rpm: 0.0};
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
