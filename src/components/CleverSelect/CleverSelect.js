import React, {Component} from 'react'

import './CleverSelect.css'

class CleverSelect extends Component {
    constructor() {
        this.value;
        this.options; 

        this.getValue.bind(this);
        this.setValue.bind(this);
        this.onChange.bind(this);
    }

    onChange(e) {
        console.log("onChange fired", e);
    } 

    getValue() {
        return this.value; //probably don't need this if we have the property...but it might be nice for parity with setValue.
    }

    setValue(val) {
        //validate the val before setting
        this.value = val;
    }

    render() {
        console.log(this.props)
        //if we chain in onChange prop but still fire the built in...which should occur first?
        return (
            <select onChange={this.onChange}>
                <option>Something</option>
                <option>Option 2</option>
            </select>
        );
    }
}

export default CleverSelect;