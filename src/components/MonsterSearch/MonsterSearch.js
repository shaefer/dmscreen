import React, { Component } from 'react';
import { connect } from 'react-redux'
import {monsterS3SelectChangeHandler} from '../../action-creators'

class MonsterSearch extends Component {
    constructor() {
        super();
        this.handleMonsterSelectChange = this.handleMonsterSelectChange.bind(this);
    }

    handleMonsterSelectChange(e) {
        this.props.monsterS3SelectChangeHandler(e);
    }
    
    render() {
        const { config, select, monster, s3Select } = this.props;
        return (
            <div>
                <span>Hello World</span>
                <button onClick={this.handleMonsterSelectChange}>Search</button>
                {s3Select.monsterList.map(x => <div>{x.name} CR: {x.cr} Str: {x.str}</div>)}
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {monsterS3SelectChangeHandler})(MonsterSearch)