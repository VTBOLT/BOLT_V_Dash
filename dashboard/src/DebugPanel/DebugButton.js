import React from 'react';
import styles from './DebugPanel.module.css';

const closedStyle = {
    position: 'absolute',
    fontSize: '45px',
    left: '47.2%',
    top: '88.1%',
    background: 'darkorange',
    transform: 'rotate(180deg)',
    border: '2px solid black',
    borderTop: 'none'
};

const openStyle = {
    position: 'absolute',
    fontSize: '50px',
    left: '50.6%',
    top: '22.3%',
    background: 'lightgrey',
    zIndex: '999'
};

class DebugButton extends React.Component {

    render() {
        return (
            <div>
                <span style={ this.props.open ? openStyle : closedStyle }>&#x25BC;</span>
            </div>
        )
    }
}

export default DebugButton;
// &#x25BC&#x25BC