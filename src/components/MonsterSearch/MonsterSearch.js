import React, { Component } from 'react';
import { connect } from 'react-redux'
import {monsterS3SelectChangeHandler} from '../../action-creators'
import MonsterSearchForm from './MonsterSearchForm'

const mapMonsters = (monsters) => {
    return monsters.map(x => {

        const acSection = (x.ac) ? <span> AC: {x.ac}</span> : "";

        return <div>{x.name} CR: {x.cr} Str: {x.str}{acSection}</div>;
    });
}

class MonsterSearch extends Component {
    constructor() {
        super();
        this.handleMonsterSelectChange = this.handleMonsterSelectChange.bind(this);
    }

    submit = values => {
        this.handleMonsterSelectChange(values);
    }

    handleMonsterSelectChange(e) {
        this.props.monsterS3SelectChangeHandler(e);
    }
    
    render() {
        const { config, select, monster, s3Select } = this.props;
        return (
            <div>
                <span>Hello World</span>
                <MonsterSearchForm onSubmit={this.submit} />
                {mapMonsters(s3Select.monsterList)}
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {monsterS3SelectChangeHandler})(MonsterSearch)