import React from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import { CHART_TYPES } from '../../constants.js'
import { setReportChartType } from '../../redux/actions/actions.js'
import css from './Report.module.sass'
import ReactApexChart from 'react-apexcharts'
import Loading from '../ui/Loading'

const ReportChart = props => {
        const types = props.types.map(t =>
            <option key={`${uniqid()}-${uniqid()}`} value={t}>{t}</option>
        )

        const stacked = props.activeType === CHART_TYPES.COMPANIES
        const data = {
            options: {
                chart: {
                    id: `${uniqid()}-chart`,
                    stacked
                },
                xaxis: {
                    categories: [1991, 1992, 1994, 1995, 1996, 1997, 1998, 1999]
                }
            },
            series: [
                {
                    name: "слой-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                },
                {
                    name: "слой-2",
                    data: [3, 45, 60, 70, 80, 60, 65, 20]
                }
            ]
        }

        let chartType = 'bar'
        if (props.activeType === CHART_TYPES.DYNAMIC) {
            chartType = 'line'
        }

        const viewChart = props.series === null || props.labels === null
            ? (<Loading />) : (
            <ReactApexChart
                type={chartType}
                height={400}
                width='100%'
                options={data.options}
                series={data.series}
                key={uniqid()}
            />
        )

        return (
            <div className={css['chart-content']}>
                <select size={1}
                        className={css.selectType}
                        value={props.activeType}
                        onChange={event =>
                            props.setType(event.target.selectedOptions[0].value)}
                >
                    {types}
                </select>
                <div className={css['chart-block']}>
                    <div className={css['chart-sidebar']}>
                        <select  size={3}
                                 className={css['chart-sidebar__block']}>

                        </select>
                        <select  size={3}
                                 className={css['chart-sidebar__block']}>

                        </select>
                    </div>
                    <div className={css.chart}>{viewChart}</div>
                </div>
            </div>
        )
}

const mapStateToProps = state => ({
    layers: state.report.layers,
    types: state.report.chartTypes,
    activeType: state.report.chartType
})

const mapDispatchToProps = dispatch => ({
    setType: value => dispatch(setReportChartType(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportChart)