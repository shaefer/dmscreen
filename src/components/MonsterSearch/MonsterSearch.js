import React, { Component } from 'react';
import { connect } from 'react-redux'
import {monsterS3SelectChangeHandler} from '../../action-creators'

import MonsterSearchForm from './MonsterSearchForm'

import ReactTable from "react-table";
import "react-table/react-table.css";

const mapMonsters = (monsters) => {
    return monsters.map(x => {

        const strSection = (x.str) ? <span> Str: {x.str}</span> : "";
        const acSection = (x.ac) ? <span> AC: {x.ac}</span> : "";

        return <div>{x.name} CR: {x.cr}{strSection}{acSection}</div>;
    });
}

const mapMonstersToTable = (monsters) => {
    if (!monsters || (monsters.length == 0)) {
        monsters = [{name: "No Monsters Found", cr:0, str:1, ac:10}];
    }
    let columns = [];
    columns.push({
        Header: "Name",
        accessor: "name"
    });
    columns.push({
        Header: "CR",
        accessor: "cr"
    });
    if (monsters[0].str) columns.push({
        Header: "Str",
        accessor: "str"
    });
    if (monsters[0].ac) columns.push({
        Header: "AC",
        accessor: "ac"
    });

    return <ReactTable
    data={monsters}
    columns={columns}
    showPagination={false}
    pageSize={monsters.length}
    defaultSortDesc={"name"}
    className="-striped -highlight"/>
}

const monsterCount = (monsterList) => {
    if (monsterList) return monsterList.length;
    return 0;
}

const addS = (monsterList) => {
    const count = monsterCount(monsterList);
    if (count > 1 || count == 0) return "s";
    return "";
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
                <MonsterSearchForm onSubmit={this.submit} />
                <h2>Pathfinder Monster Search (Showing {monsterCount(s3Select.monsterList)} monster{addS(s3Select.monsterList)})</h2>
                {mapMonstersToTable(s3Select.monsterList)}
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {monsterS3SelectChangeHandler})(MonsterSearch)