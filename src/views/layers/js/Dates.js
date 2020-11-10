import React from 'react'
import { connect } from 'react-redux'
import { addDateRange, deleteDateRange } from '../../../redux/actions/actions.js'
import DateRanges from '../../components/js/DateRanges.js'
import ListWithDeleteElements from '../../components/js/ListWithDeleteElements.js'

const warningText = 'Длины периодов должны быть равны'

const styled = {
    div: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    warningSpan: {
        display: 'block',
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#ffc600',
        color: '#fff',
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: 15,
        textAlign: 'center'
    },
    DateRanges: {
        fontFamily: 'Roboto, sans-serif'
    },
    ListWithDeleteElements: {
        height: 440,
        fontWeight: 300
    }
}

const Dates = props => {
    const warning = <span style={styled.warningSpan}>{warningText}</span>
    return (
        <div>
            {props.items.length === 0 ? warning : null}
            <div style={styled.div}>
                <DateRanges add={props.add} style={styled.DateRanges}/>
                <ListWithDeleteElements
                    style={styled.ListWithDeleteElements}
                    items={props.items}
                    deleteHandler={props.deleteRange}
                />
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    const datesToString = date => {
        const start = new Date(date.startDate)
        const end = new Date(date.endDate)
        const startLine =
            `${start.getDate()}.${start.getMonth() + 1}.${start.getFullYear()}`
        const endLine =
            `${end.getDate()}.${end.getMonth() + 1}.${end.getFullYear()}`
        return `${startLine} - ${endLine}`
    }
    const props = {items: state.dateRanges.map(datesToString)}
    return props
}

const mapDispatchToProps = dispatch => ({
    add: ranges => dispatch(addDateRange(ranges)),
    deleteRange: range => dispatch(deleteDateRange(range))
})


export default connect(mapStateToProps, mapDispatchToProps)(Dates)