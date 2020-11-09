import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import { COMP_TABLE, GRAPH, ORDERS_TABLE } from '../../../constants.js'
import css from '../sass/Report.module.sass'
import ReportGraph from './ReportGraph.js'
import { GoogleCharts } from 'google-charts'

class Report extends Component {

    state = {
        chartTableId: '',
        drawTable: () => {}
    }

    componentWillMount = () => {
        GoogleCharts.api.charts.load('current', {'packages':['table']});
        GoogleCharts.api.charts.setOnLoadCallback(drawTable);
        function drawTable(dataset, id) {
            var data = new GoogleCharts.api.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Salary');
            data.addColumn('boolean', 'Full Time Employee');
            data.addRows([
                ['Mike',  {v: 10000, f: '$10,000'}, true],
                ['Jim',   {v:8000,   f: '$8,000'},  false],
                ['Bob',   {v: 7000,  f: '$7,000'},  true]
            ]);
            var table = new GoogleCharts.api.visualization.Table(document.getElementById(id));
            table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
        }
        this.setState({chartTableId: `chart-table-${uniqid()}`, drawTable})
    }

    componentDidMount = () => {
        this.state.drawTable(null, this.state.chartTableId)
        window.addEventListener('resize', () => this.state.drawTable(null, this.state.chartTableId))
    }

    render() {
        return (
            <div>
                <select defaultValue={GRAPH} className={css.select}>
                    <option value={GRAPH}>{GRAPH}</option>
                    <option value={COMP_TABLE}>{COMP_TABLE}</option>
                    <option value={ORDERS_TABLE}>{ORDERS_TABLE}</option>
                </select>
                <ReportGraph className={css.content}/>
                <div className={css.content} id={this.state.chartTableId} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    const props = {
    }
    return props
}

const mapDispatchToProps = dispatch => {
    const props = {
    }
    return props
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)