import React from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import { CHART_TYPES, CLASSIFIERS, COMPANIES } from '../../constants.js'
import { setReportChartType } from '../../redux/actions/actions.js'
import css from './Report.module.sass'
import ReactApexChart from 'react-apexcharts'
import Loading from '../ui/Loading'

const ReportChart = props => {
        const types = props.types.map(t =>
            <option key={`${uniqid()}-${uniqid()}`} value={t.name}>{t.label}</option>
        )

        const stacked = props.activeType.name === CHART_TYPES.COMPANIES.name
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
        if (props.activeType.name === CHART_TYPES.DYNAMIC.name) {
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

        let list1 = []
        let list2 = []
        switch (props.activeType.name) {
            case CHART_TYPES.DYNAMIC.name:
                list1 = props.categories[COMPANIES].items
                list2 = props.categories[CLASSIFIERS].items
                break;
            case CHART_TYPES.COMPANIES.name:
                list1 = props.dateRanges
                list2 = props.categories[COMPANIES].items
                break
            case CHART_TYPES.CLASSIFIERS.name:
                list1 = props.dateRanges
                list2 = props.statuses
                break
        }

        return (
            <div className={css['chart-content']}>
                <select size={1}
                        className={css.selectType}
                        value={props.activeType.name}
                        onChange={event =>
                            props.setType(event.target.selectedOptions[0].value)}
                >
                    {types}
                </select>
                <div className={css['chart-block']}>
                    <div className={css['chart-sidebar']}>
                        <select  size={3}
                                 className={css['chart-sidebar__block']}
                        >
                            {list1.map(l => <option key={uniqid()} value={l}>{l}</option>)}
                        </select>
                        <select  size={3}
                                 className={css['chart-sidebar__block']}
                        >
                            {list2.map(l => <option key={uniqid()} value={l}>{l}</option>)}
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
    activeType: state.report.chartType,
    categories: state.categories,
    statuses: state.statuses.selects,
    dateRanges: state.dateRanges.map(r => `${r.startDate.toLocaleDateString()} - ${r.endDate.toLocaleDateString()}`)
})

const mapDispatchToProps = dispatch => ({
    setType: value => dispatch(setReportChartType(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportChart)