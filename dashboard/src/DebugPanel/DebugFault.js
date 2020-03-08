import React from 'react';
import styles from './DebugPanel.module.css';

class DebugFault extends React.Component {
    constructor(props) {
        super(props);

        this.state = {message: 'No fault'};
    }

    render() {
        return (
            <div id={ styles.debugFault }>
                <span>{ this.state.message }</span>
            </div>
        )
    }
}

export default DebugFault;