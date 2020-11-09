import { GoogleCharts } from 'google-charts'
import randomColor from 'randomcolor'
import React from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import { setReportGraphType } from '../../../redux/actions/actions.js'
import CheckBoxesBlock from '../../components/js/CheckBoxesBlock.js'
import css from '../sass/Report.module.sass'

const LAYERS_TITLE = 'Слои'

class ReportGraph extends React.Component {

    state = {
        chartId: '',
        drawChart: () => {}
    }

    componentWillMount = () => {
        const drawChart = (dataset, id, graph) => {
            const data = GoogleCharts.api.visualization.arrayToDataTable([
                ['Year', 'Sales', 'Expenses'],
                ['2004',  1000,      400],
                ['2005',  1170,      460],
                ['2006',  660,       1120],
                ['2007',  1030,      540]
            ]);
            const pie_1_chart = new GoogleCharts.api
                .visualization.ColumnChart(document.getElementById(id))
            const pie_1_chart_options = {chartArea: {left: 0, top: 0, width: '100%', height: '90%'}}
            pie_1_chart.draw(data, pie_1_chart_options)
        }
        GoogleCharts.load(drawChart)

        this.setState({chartId: `chart-${uniqid()}`, drawChart})
    }

    componentDidMount = () => {
        this.state.drawChart(null, this.state.chartId)
        window.addEventListener('resize', () => this.state.drawChart(null, this.state.chartId))
    }

    // componentWillUnmount = () => document.removeEventListener('resize')

    render() {
        return (
            <div className={this.props.className}>
                <div className={css.sidebar}>
                    <CheckBoxesBlock
                        title={LAYERS_TITLE}
                        items={this.props.layers}
                        onChange={this.props.setType}
                        className={css.block}
                    />
                    <hr className={css.hr}/>
                    <select size={3}
                            className={css.selectType}
                            defaultValue={this.props.activeType}
                            onChange={event => this.props.setType(event.target.value)}
                    >
                        {this.props.types.map(t => <option key={uniqid()}>{t}</option>)}
                    </select>
                </div>
                <div className={css.main} id={this.state.chartId}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const props = {
        layers: state.report.layers,
        types: state.report.types,
        activeType: state.report.activeType
    }
    return props
}

const mapDispatchToProps = dispatch => {
    const props = {
        setType: value => dispatch(setReportGraphType(value))
    }
    return props
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportGraph)