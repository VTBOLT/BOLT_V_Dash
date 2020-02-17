import React from 'react';
import RPMBar from './RPMBar.js';
import CANListener from './CANListener.js';

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <RPMBar />

        <CANListener />
      </div>
    );
  }
}

export default App;
