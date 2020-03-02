import React from 'react';
import { getSocket } from '../CANSubscriber';
import styles from './SOCBar.module.css';

const socPath = 'M 10 27.5 L 190 27.5';
const socBorderPath = 'M 10 10 L 190 10 L 190 45 L 10 45 L 10 8.7';
const socWidth = '35';
const borderWidth = '2.8';
const socSVGBox = '0 0 220 60';

class SOCBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {soc: 0.0};
        getSocket().on('soc', (soc) => this.setState({
            soc
        }));

    }

    getSOCPath() {
        let endVal = ((this.state.soc / 100.0) * 180.0) + 10
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
            </div>

        )
    }
};

export default SOCBar;