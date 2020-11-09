import React from 'react'
import { connect } from 'react-redux'
import { addDateRange, deleteDateRange } from '../../../redux/actions/actions.js'
import DateRanges from '../../components/js/DateRanges.js'
import ListWithDeleteElements from '../../components/js/ListWithDeleteElements.js'
import css from '../sass/Dates.module.sass'

const Dates = props =>
    <div className={css.screen}>
        <DateRanges add={props.add}/>
        <ListWithDeleteElements
            style={{
                height: '440px'
            }}
            items={props.items}
            deleteHandler={props.deleteRange}
        />
    </div>

function mapStateToProps(state) {
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

function mapDispatchToProps(dispatch) {
    const props = {
        add: ranges => dispatch(addDateRange(ranges)),
        deleteRange: range => dispatch(deleteDateRange(range))
    }
    return props
}


export default connect(mapStateToProps, mapDispatchToProps)(Dates)