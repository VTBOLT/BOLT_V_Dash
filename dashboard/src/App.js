import React from 'react';
import RPMBar from './RPMBar/RPMBar.js';
import SOCBar from './SOCBar/SOCBar';
import CoolantTempBar from './CoolantTempBar/CoolantTempBar.js';
import styles from './App.module.css';
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
        <div id={ styles.bars }>
          <SOCBar />
          <CoolantTempBar />
        </div>
       
      </div>
    );
  }
}

export default App;
