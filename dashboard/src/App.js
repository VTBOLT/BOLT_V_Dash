import React from 'react';
import RPMBar from './RPMBar/RPMBar.js';
import SOCBar from './SOCBar/SOCBar';
import CoolantTempBar from './CoolantTempBar/CoolantTempBar.js';
import DebugPanel from './DebugPanel/DebugPanel.js';
import styles from './App.module.css';
import { subscribeToCAN } from './CANSubscriber';
import DebugFault from './DebugPanel/DebugFault.js';
import DebugButton from './DebugPanel/DebugButton.js';
import FaultPanel from './FaultPanel/FaultPanel.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { debugOpen: false }
    subscribeToCAN(); 
  }

  toggleState() {
    this.setState(prevState => ({
      debugOpen: !prevState.debugOpen
    }));
  }

  render() {
    return (
      <div className="App">
        <RPMBar />
        <FaultPanel />
        <div onClick={ () => this.toggleState() }>
          <DebugButton open={ this.state.debugOpen } />
        </div>
        <div 
          id={ styles.bars } 
          style={ this.state.debugOpen ? {"display": "none"} : {} }
        >
          <SOCBar />
          <CoolantTempBar />
        </div>
        <div 
          id={ styles.debugContainer } 
          style={ this.state.debugOpen ? {} : {"display": "none"} }
        >
          <DebugFault />
          <DebugPanel />
        </div>
      </div>
    );
  }
}

export default App;

