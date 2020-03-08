import React from 'react';
import RPMBar from './RPMBar/RPMBar.js';
import SOCBar from './SOCBar/SOCBar';
import CoolantTempBar from './CoolantTempBar/CoolantTempBar.js';
import DebugPanel from './DebugPanel/DebugPanel.js';
import styles from './App.module.css';
import { subscribeToCAN } from './CANSubscriber';
import DebugFault from './DebugPanel/DebugFault.js';
import DebugButton from './DebugPanel/DebugButton.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { debugOpen: false }
    subscribeToCAN();    
  }

  render() {
    return (
      <div className="App">
        <RPMBar />
        <div 
          id={ styles.bars } 
          style={ this.state.debugOpen ? {"display": "none"} : {} }
          onClick={ () => this.setState({debugOpen: true}) }
        >
          <SOCBar />
          <CoolantTempBar />
        </div>
        <div 
          id={ styles.debugContainer } 
          style={ this.state.debugOpen ? {} : {"display": "none"} }
        >
          <DebugButton />
          <DebugFault />
          <DebugPanel />
        </div>
      </div>
    );
  }
}

export default App;

// <RPMBar />
//         <div id={ styles.bars }>
//           <SOCBar />
//           <CoolantTempBar />
//         </div>
