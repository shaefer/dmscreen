import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class MonsterTable extends Component {
    render() {
        let monsters = this.props.monsters;
        if (!monsters || (monsters.length === 0)) {
            monsters = [{name: "No Monsters Found", cr:0, str:1, ac:10}];
        }
        let columns = [];
        columns.push({
            Header: "Name",
            accessor: "name",
            maxWidth: 400,
            minWidth: 100
        });
        columns.push({
            Header: "CR",
            accessor: "cr",
            maxWidth: 100,
            minWidth: 30
        });
        if (monsters[0].str) columns.push({
            Header: "Str",
            accessor: "str",
            maxWidth: 100,
            minWidth: 30
        });
        if (monsters[0].ac) columns.push({
            Header: "AC",
            accessor: "ac",
            maxWidth: 100,
            minWidth: 30
        });
    
        return <ReactTable
        data={monsters}
        columns={columns}
        showPagination={false}
        pageSize={monsters.length}
        defaultSorted={[
            {
                id: "name",
                desc: false
            }
        ]}
        className="-striped -highlight"/>
    }
}

export default MonsterTable;