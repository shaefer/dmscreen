import React, { Component } from 'react';
import { connect } from 'react-redux'
import {fetchSelectAction as getMonstersByCriteria} from '../../action-creators'

class CRButton extends Component {
    makeCRButton(cr, numOfMonsters = 1) {
        if (cr < 0 || numOfMonsters < 1 || numOfMonsters > 1000 || cr > 30) return "";
        const searchParams = {cr: cr, crOperator: "=", num:numOfMonsters}
        const fetchCall = () => this.props.getMonstersByCriteria(searchParams);
        const countStr = (numOfMonsters > 1) ? numOfMonsters + " " : "";
        const s = (numOfMonsters > 1) ? "s" : "";
        return <button type="button" className="greenAwesome" onClick={() => fetchCall()}>{countStr}CR {cr} Monster{s}</button>
    }
    
    render() {
        return this.makeCRButton(this.props.cr, this.props.numOfMonsters);
    }
}

export default connect(state => state, { getMonstersByCriteria })(CRButton)