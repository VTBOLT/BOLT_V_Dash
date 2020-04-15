import React from 'react';
import { getSocket } from '../CANSubscriber';
import styles from './DebugPanel.module.css';

class DebugItem extends React.Component {

    constructor(props) {
        super(props);
        let name = this.props.name;
        this.state = {name: 888.88};
        getSocket().on(name, (value) => this.setState({
            name: value.toFixed(2)
        }));
    }

    render() {
        return (
            <div className={ styles.itemContainer }>
                <span className={ styles.itemName }>{ this.props.name }</span>
                <br />
                <span className={ styles.itemValue }>{ this.state.name }</span>
            </div>
        )
    }


}

export default DebugItem;