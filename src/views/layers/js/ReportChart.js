import React from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import { CHART_TYPES } from '../../../constants.js'
import { setReportChartType } from '../../../redux/actions/actions.js'
import CheckBoxesBlock from '../../components/js/CheckBoxesBlock.js'
import css from '../sass/Report.module.sass'
import ReactApexChart from 'react-apexcharts'

const LAYERS_TITLE = 'Слои'

class ReportChart extends React.Component {

    state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: "series-2",
                data: [3, 45, 60, 70, 80, 60, 65, 20]
            }
        ]
    };


    render() {
        const isActiveType = t => t === this.props.type
            ? {backgroundColor: 'blue'} : null

        const types = this.props.types.map(t => (
            <option key={uniqid()}
                    style={isActiveType(t)}>
                {t}
            </option>
        ))

        let chart

        switch (this.props.activeType) {
            case CHART_TYPES.DYNAMIC:
                chart = (
                    <ReactApexChart
                        type="bar"
                        height={400}
                        width='100%'
                        options={this.state.options}
                        series={this.state.series}
                        key={uniqid()}
                    />
                )
                break
            case CHART_TYPES.FOR_PERIOD:
                chart = (
                    <ReactApexChart
                        type="bar"
                        height={400}
                        width='100%'
                        options={this.state.options}
                        series={this.state.series}
                        key={uniqid()}
                    />
                )
                break
            case CHART_TYPES.COMPANIES:
                chart = (
                    <ReactApexChart
                        type="line"
                        height={400}
                        width='100%'
                        options={this.state.options}
                        series={this.state.series}
                        key={uniqid()}
                    />
                )
                break
            default:
                chart = null
                break;
        }

        console.log(this.props.activeType, chart)

        return (
            <div className={this.props.className}>
                <div className={css.sidebar}>
                    <CheckBoxesBlock
                        title={LAYERS_TITLE}
                        items={this.props.layers.map(l => ({...l, text: l.text}))}
                        onChange={this.props.setType}
                        className={css.block}
                    />
                    <hr className={css.hr}/>
                    <select size={3}
                            className={css.selectType}
                            value={this.props.activeType}
                            onChange={event => this.props.setType(event.target.selectedOptions[0].value)}
                    >
                        {types}
                    </select>
                </div>
                <div className={css.chart}>{chart}</div>
            </div>
        )
    }
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