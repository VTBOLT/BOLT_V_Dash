import React from 'react';
import DebugItem from './DebugItem';
import styles from './DebugPanel.module.css';

class DebugPanel extends React.Component {


    render() {
        return (
            <div className={ styles.panelContainer }>
                <DebugItem name="MC Temp" />
                <DebugItem name="Motor Temp" />
                <DebugItem name="High Cell" />
                <DebugItem name="Low Cell" />
            
                <DebugItem name="DCL" />
                <DebugItem name="DC Bus V" />
                <DebugItem name="DC Bus A" />
                <DebugItem name="Latitude" />

                <DebugItem name="Speed" />
                <DebugItem name="SOC" />
                <DebugItem name="RPM" />
                <DebugItem name="Longitude" />
            </div>
        )
    }
}

export default DebugPanel;
