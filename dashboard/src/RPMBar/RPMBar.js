import React from 'react';
import { getSocket } from '../CANSubscriber';
import styles from './RPMBar.module.css';

const rpmPath = 'M 20 124 L 65 94 C 140 49 185 34 290 34 L 785 34';
const borderPath = 'M 35 147' + 
                    'C 140 75 185 60 290 62' +
                    // curved corners at end
                    // 'L 767 62' +
                    // 'C 787 62 787 62 787 42' +
                    // 'L 787 26' +
                    // 'C 787 7 787 7 767 7' +
                    // 'L 290 7' +
                    'L 787 62' +
                    'L 787 7' +
                    'L 290 7' +
                    'C 180 7 105 25 5 100' +
                    'L 38 149';
const svgBox = '0 0 800 175';
const rpmWidth = '55';
const borderWidth = '6';
const rpmBarLength = 785;
const maxRPM = 8000.0;

class RPMBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {rpm: 0};
        getSocket().on('rpm', (rpm) => this.setState({
            rpm
        }));

    }

    /**
     * Returns a string representation of an SVG path dasharray
     * with a length corresponding to the percentage that rpm value is compared to the max rpm
     * TODO enhance this for nonlinear rpm growth
     */
    getDashArray() {
        return (this.state.rpm / maxRPM) * rpmBarLength + ' ' + rpmBarLength;
    }

    render() {
        return (
            <div className={ styles.rpmContainer }>
                <svg viewBox={ svgBox } className={ styles.svgBox }>
                    <path 
                        id="rpmBackground"
                        strokeWidth={ rpmWidth } 
                        stroke="lightgrey" 
                        d={ rpmPath } 
                        fill="none"
                    />
                    <path 
                        id="currentRPM"
                        strokeWidth={ rpmWidth } 
                        stroke="darkblue" 
                        d={ rpmPath } 
                        fill="none"
                        strokeDasharray={ this.getDashArray(this.state.rpm) }
                    />
                    <path 
                        id="rpmBorder"
                        strokeWidth={ borderWidth }
                        stroke="black"
                        d={ borderPath }
                        fill="none"
                    />
                </svg>
                <p className={ styles.rpmText }>{this.state.rpm}</p>
            </div>
        )
    }
};

export default RPMBar;