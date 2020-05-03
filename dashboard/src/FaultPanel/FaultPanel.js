import React from 'react';
import { getSocket } from '../CANSubscriber';
import styles from './FaultPanel.module.css';

//run faults (low byte) dict
const run_lo_fault_dict = {
    0x0001: ['Motor Over-speed Fault', FaultLevel.LOW],
    0x0002: ['Over-current Fault', FaultLevel.HIGH],
    0x0004: ['Over-voltage', FaultLevel.HIGH],
    0x0008: ['Inverter Over-temperature Fault', FaultLevel.MID],
    0x0010: ['Accelerator Input Shorted Fault', FaultLevel.MID],
    0x0020: ['Accelerator Input Open Fault', FaultLevel.MID],
    0x0080: ['Inverter Response Time-out Fault', FaultLevel.LOW],
    0x0100: ['Hardware Gate/Desaturation Fault', FaultLevel.HIGH],
    0x0200: ['Hardware Over-current Fault', FaultLevel.HIGH],
    0x0400: ['Under-voltage Fault', FaultLevel.MID],
    0x0800: ['CAN Command Message Lost Fault', FaultLevel.MID],
    0x1000: ['Motor Over-temerature Fault', FaultLevel.MID]
};

//run faults (high byte) dict
const run_hi_fault_dict = {
    0x0001: ['Brake Input Shorted Fault', FaultLevel.LOW],
    0x0002: ['Brake Input Open Fault', FaultLevel.LOW],
    0x0004: ['Module A Over-temperature Fault', FaultLevel.MID],
    0x0008: ['Module B Over-temperature Fualt', FaultLevel.MID],
    0x0010: ['Module C Over-temperature Fault', FaultLevel.MID],
    0x0020: ['PCB Over-temperature Fault', FaultLevel.MID],
    0x0040: ['Gate Drive Board 1 Over-temperature Fault', FaultLevel.MID],
    0x0080: ['Gate Drive Board 2 Over-temperature Fault', FaultLevel.MID],
    0x0100: ['Gate Drive Board 3 Over-temperature Fault', FaultLevel.MID],
    0x0200: ['Current Sensor Fault', FaultLevel.MID],
    0x4000: ['Resolver Not Connected', FaultLevel.MID]
};

//post faults (low byte) dict
var post_lo_fault_dict = {
    0x0001: ['Hardware Gate/Desaturation Fault', FaultLevel.LOW],
    0x0002: ['HW Over-current Fault', FaultLevel.MID],
    0x0004: ['Accelerator Shorted', FaultLevel.HIGH],
    0x0008: ['Accelerator Open', FaultLevel.HIGH],
    0x0010: ['Current Sensor Low', FaultLevel.LOW],
    0x0020: ['Current Sensor High', FaultLevel.LOW],
    0x0040: ['Module Temperature Low', FaultLevel.LOW],
    0x0080: ['Module Temperature High', FaultLevel.LOW],
    0x0100: ['Control PCB Temperature Low', FaultLevel.LOW],
    0x0200: ['Control PCB Temperature High', FaultLevel.LOW],
    0x0400: ['Gate Drive PCB Temperature Low', FaultLevel.LOW],
    0x0800: ['Gate Drive PCB Temperature High', FaultLevel.LOW],
    0x1000: ['5V Sense Voltage Low', FaultLevel.LOW],
    0x2000: ['5V Sense Voltage High', FaultLevel.LOW],
    0x4000: ['12V Sense Voltage Low', FaultLevel.LOW],
    0x8000: ['12V Sense Voltage High', FaultLevel.LOW]
};

//post faults (low byte) dict
var post_hi_fault_dict = {
    0x0001: ['2.5V Sense Voltage Low', FaultLevel.LOW],
    0x0002: ['2.5V Sense Voltage High', FaultLevel.LOW],
    0x0004: ['1.5V Sense Voltage Low', FaultLevel.LOW],
    0x0008: ['1.5V Sense Voltage High', FaultLevel.LOW],
    0x0010: ['DC Bus Voltage High', FaultLevel.LOW],
    0x0020: ['DC Bus Voltage Low', FaultLevel.LOW],
    0x0040: ['Pre-charge Timeout', FaultLevel.MID],
    0x0080: ['Pre-charge Voltage Failure', FaultLevel.LOW],
    0x0100: ['EEPROM Checksum Invalid', FaultLevel.LOW],
    0x0200: ['EEPROM Data Out of Range', FaultLevel.LOW],
    0x0400: ['EEPROM Update Required', FaultLevel.LOW],
    0x4000: ['Brake Shorted', FaultLevel.HIGH],
    0x8000: ['Brake Open', FaultLevel.HIGH]
};

//enum for faults
const FaultLevel = {
    LOW: 1,
    MID: 2,
    HIGH: 3
};

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
        getSocket().on('fault', (faultBytes) => {
            let error = this.getHighestError(faultBytes);
            // TODO - set the debug panel message for all faults
            
            // only flash the screen for high faults
            if (error[1] == FaultLevel.HIGH) {
                this.flashMessage(this, error[0]);
            }
        });
    }

    // flashes a message 5 times and then leaves it on the screen ten seconds
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

        setTimeout(function () {
            ctxt.setState({
                fault: message,
                active: false
            });
        }, 10000);
    }

    // get the highest fault message and return the message + the fault level
    getHighestError(faultBytes) {
        let runLO = faultBytes[0];
        let runHI = faultBytes[1];
        let postLO = faultBytes[2];
        let postHI = faultBytes[3];
        
        let faultSet = new Set();
        let runLObits = twoBytesToBits(runLO);
        runLObits.forEach(element => {
          faultSet.add(run_lo_fault_dict[element]);
        });
        let runHIbits = twoBytesToBits(runHI);
        runHIbits.forEach(element => {
          faultSet.add(run_hi_fault_dict[element]);
        });
        let postLObits = twoBytesToBits(postLO);
        postLObits.forEach(element => {
          faultSet.add(post_lo_fault_dict[element]);
        });
        let postHIbits = twoBytesToBits(postHI);
        postHIbits.forEach(element => {
          faultSet.add(post_hi_fault_dict[element]);
        });
        let highestError = analyzeFaultSet(faultSet);
        
        return highestError;
    }

    // get the highest fault from all the existing ones
    analyzeFaultSet(set) {
        if(set.size == 0) {
            return ['', 0];
        }
        let max = 0;
        let message = '';
        for (let item of set) {
            if (item[1] > max) {
            max = item[1];
            message = item[0];
            }
        }
        return [message, max];
    }

    // fault codes occupy less than a full byte, so we use this to convert the bytes to arrays of bits
    twoBytesToBits(bytes) {
        byteArr = [];
        for(var i = 65536; i >= 1; i/= 2) {
          if(bytes & i) {
            byteArr.push(i);
          }
        }
        return byteArr;
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
  