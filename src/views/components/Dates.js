import React from 'react'
import { connect } from 'react-redux'
import { addDateRange, deleteDateRange } from '../../redux/actions/actions.js'
import DateRanges from './DateRanges.js'
import ListWithDeleteElements from '../ui/ListWithDeleteElements.js'
import sass from './Dates.module.sass'

const warningText = 'Длины периодов должны быть равны'

const Dates = props => {
    return (
        <div>
            <span className={sass.warningSpan}>{warningText}</span>
            <div className={sass.div}>
                <DateRanges add={props.add} className={sass.DateRanges}/>
                <ListWithDeleteElements
                    className={sass.ListWithDeleteElements}
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