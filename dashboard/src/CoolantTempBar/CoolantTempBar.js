import React from 'react';
import { getSocket } from '../CANSubscriber';
import styles from './CoolantTempBar.module.css';


const coolantPath = 'M 210 27.5 L 390 27.5';
const coolantBorder = 'M 210 16 L 390 16 L 390 39 L 210 39 L 210 15.5';
const coolantWidth = '23';
const borderWidth = '1';
const coolantSVGBox = '0 0 400 50';

class CoolantTempBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {coolantTemp: 0.0};
        getSocket().on('coolantTemp', (coolantTemp) => this.setState({
            coolantTemp
        }));

    }

    getCoolantTempPath() {
        let endVal = ((this.state.coolantTemp / 80.0) * 180.0) + 210;
        return 'M 210 27.5 L ' + endVal.toFixed(3) + ' 27.5';
    }

    render() {
        return (
            <div className={ styles.coolantTempContainer }>
                <svg viewBox={ coolantSVGBox } className={ styles.coolantSVGBox }>
                    <path 
                        id="coolantBackground"
                        strokeWidth={ coolantWidth } 
                        stroke="lightgrey" 
                        d={ coolantPath } 
                        fill="none"
                    />
                    <path 
                        id="currentCoolantTemp"
                        strokeWidth={ coolantWidth } 
                        stroke={ this.state.coolantTemp < 70 ? "darkgreen" : "red" } 
                        d={ this.getCoolantTempPath() } 
                        fill="none"
                    />
                    <path 
                        id="coolantBorder"
                        strokeWidth={ borderWidth }
                        stroke="black"
                        d={ coolantBorder }
                        fill="none"
                    />
                </svg>
                <p id={ styles.coolantText }>{ this.state.coolantTemp.toFixed(0) }</p>
                <p id={ styles.coolantLabel }>Coolant Temp</p>
            </div>
        )
    }
}

export default CoolantTempBar;