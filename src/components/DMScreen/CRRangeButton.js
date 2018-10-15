import React, { Component } from 'react';
import { connect } from 'react-redux'
import {fetchSelectAction as getMonstersByCriteria} from '../../action-creators'

class CRRangeButton extends Component {
    makeCRRangeButton(crStart, crEnd, numOfMonsters = 1) {
        if (crStart < 0 || numOfMonsters < 1 || numOfMonsters > 1000 || crEnd > 30 || crEnd < crStart) return "";
        const searchParams = {cr: crStart, crEnd: crEnd, crOperator: "btw", num:numOfMonsters}
        const fetchCall = () => this.props.getMonstersByCriteria(searchParams);
        const countStr = (numOfMonsters > 1) ? numOfMonsters + " " : "";
        const s = (numOfMonsters > 1) ? "s" : "";
        return <button type="button" className="greenAwesome" onClick={() => fetchCall()}>{countStr}CR {crStart}-{crEnd} Monster{s}</button>
    }
    
    render() {
        return this.makeCRRangeButton(this.props.crStart, this.props.crEnd, this.props.numOfMonsters);
    }
}

export default connect(state => state, { getMonstersByCriteria })(CRRangeButton)