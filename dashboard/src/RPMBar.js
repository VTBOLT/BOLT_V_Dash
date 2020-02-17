import React from 'react';

const rpmPath = 'M 15 120 L 60 90 C 135 45 180 30 285 30 L 780 30';
const svgBox = '0 0 800 150';
const rpmWidth = '50';
const rpmBarLength = 783;
const maxRPM = 8000.0;

class RPMBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { rpm: 0.0 };
    }

    /**
     * Takes in an rpm value and returns a string representation of an SVG path dasharray
     * with a length corresponding to the percentage that rpm value is compared to the max rpm
     * TODO enhance this for nonlinear rpm growth
     * 
     * @param {int} rpm the new rpm value
     */
    getDashArray(rpm) {
        return (this.state.rpm / maxRPM) * rpmBarLength + ' ' + rpmBarLength;
    }

    render() {
        return (
            <div>
                <svg viewBox={ svgBox }>
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
                </svg>
            </div>
        )
    }
};

export default RPMBar;