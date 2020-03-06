import React from 'react';
import { getSocket } from '../CANSubscriber';
import styles from './SOCBar.module.css';

const socPath = 'M 10 27.5 L 190 27.5';
const socBorderPath = 'M 10 16 L 190 16 L 190 39 L 10 39 L 10 15.5';
const socWidth = '23';
const borderWidth = '1';
const socSVGBox = '0 0 400 50';

class SOCBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {soc: 0.0};
        getSocket().on('soc', (soc) => this.setState({
            soc
        }));

    }

    getSOCPath() {
        let endVal = ((this.state.soc / 100.0) * 180.0) + 10;
        return 'M 10 27.5 L ' + endVal.toFixed(3) + ' 27.5';
    }

    render() {
        return (
            <div className={ styles.socContainer }>
                <svg viewBox={ socSVGBox } className={ styles.socSVGBox }>
                    <path 
                        id="socBackground"
                        strokeWidth={ socWidth } 
                        stroke="lightgrey" 
                        d={ socPath } 
                        fill="none"
                    />
                    <path 
                        id="currentSOC"
                        strokeWidth={ socWidth } 
                        stroke={ this.state.soc > 20 ? "darkgreen" : "red" } 
                        d={ this.getSOCPath() } 
                        fill="none"
                    />
                    <path 
                        id="socBorder"
                        strokeWidth={ borderWidth }
                        stroke="black"
                        d={ socBorderPath }
                        fill="none"
                    />
                </svg>
                <p id={ styles.socText }>{ this.state.soc.toFixed(0) }</p>
                <p id={ styles.socLabel }>SOC</p>

            </div>

        )
    }
};

export default SOCBar;