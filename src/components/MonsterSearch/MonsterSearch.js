import React, { Component } from 'react';
import { connect } from 'react-redux'
import {monsterS3SelectChangeHandler} from '../../action-creators'

import MonsterSearchForm from './MonsterSearchForm'
import MonsterTable from './MonsterTable'

import '../Polyfills/Find'
import '../Polyfills/FindIndex'
import '../Polyfills/IsNaN'

import "./MonsterSearch.css"

import PageViewRecorder from '../../components/PageViewRecorder';


const monsterCount = (monsterList) => {
    return (monsterList) ? monsterList.length : 0;
}

const addS = (monsterList) => {
    const count = monsterCount(monsterList);
    return (count > 1 || count === 0) ? "s" : "";
}

class MonsterSearch extends Component {
    constructor() {
        super();
        this.handleMonsterLookup = this.handleMonsterLookup.bind(this);
    }

    componentDidMount() {
        const title = "Monster Search - Pathfinder - by Clever Orc Games";
        document.title = title;
        PageViewRecorder.recordPageView(window.location.pathname + window.location.search, undefined, title);
    }

    submit = values => {
        this.handleMonsterLookup(values);
    }

    handleMonsterLookup(values) {
        this.props.monsterS3SelectChangeHandler(values);
    }
    
    render() {
        const { s3Select } = this.props;
        return (
            <div>
                <MonsterSearchForm onSubmit={this.submit} />
                <h3 className="searchResults">Pathfinder Monster Search (Showing {monsterCount(s3Select.monsterList)} monster{addS(s3Select.monsterList)})</h3>
                <MonsterTable monsters={s3Select.monsterList}/>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {monsterS3SelectChangeHandler})(MonsterSearch)