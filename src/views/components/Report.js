import React from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import { COMP_TABLE, CHART, ORDERS_TABLE } from '../../constants.js'
import { setReportView } from '../../redux/actions/actions.js'
import Table from '../ui/Table.js'
import css from './Report.module.sass'
import ReportGraph from './ReportChart.js'

const Report = props => {
    let view
    switch (props.view) {
        case CHART:
            view = <ReportGraph className={css.content}/>
            break
        case COMP_TABLE:
            break
        case ORDERS_TABLE:
            view = <Table width='100%' height={400} items={props.orders_table}/>
            break
        default:
            break
    }

    const views = props.views.map(v => (
        <option value={v} key={uniqid()}>{v}</option>
    ))

    return (
        <div>
            <select
                value={props.view}
                className={css.select}
                onChange={event => props.viewHandler(event.target.selectedOptions[0].value)}
            >
                {views}
            </select>
            {view}
        </div>
    )
}


const mapStateToProps = state => ({
    orders_table: state.report.orders_table,
    views: state.report.views,
    view: state.report.view
})

const mapDispatchToProps = dispatch => ({
    viewHandler: value => dispatch(setReportView(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Report)