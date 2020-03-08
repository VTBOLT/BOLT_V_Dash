import React from 'react';
import styles from './DebugPanel.module.css';

class DebugButton extends React.Component {

    render() {
        return (
            <div id={ styles.debugButton }>
                <span>&#x25BC;</span>
            </div>
        )
    }
}

export default DebugButton;
// &#x25BC&#x25BC