import React from 'react';
import { getSocket } from '../CANSubscriber';
import styles from './FaultPanel.module.css';

const activeStyle = {
    display: 'block',
    position: 'absolute',
    top: '1%',
    zIndex: '-1',
    height: '98%',
    width: '98%',
    background: 'red',
    textAlign: 'center',
    verticalAlign: 'middle'
}

const inactiveStyle = {
    display: 'none '
}

var flashCount = 0;

class FaultPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fault: '',
            active: false
        };
        getSocket().on('fault', (message) => {
            this.flashMessage(this, message)
        });
    }

    flashMessage(ctxt, message) {
        setTimeout(function () {
            ctxt.setState({
                fault: message,
                active: !ctxt.state.active
            });
            flashCount++;
            if (flashCount < 11) {
                ctxt.flashMessage(ctxt, message);
            } else {
                flashCount = 0;
            }
        }, 100);


    }

    render() {
        return (
            <div className={ styles.faultContainer } style={ this.state.active ? activeStyle : inactiveStyle }>
                <p id={ styles.faultMessage }>{ this.state.fault }</p>
            </div>
        )
    }
}

export default FaultPanel;