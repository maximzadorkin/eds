import React, { Component } from 'react'
import { DateRange } from 'react-date-range'
import { ru } from 'date-fns/locale'
import css from '../sass/DateRanges.module.sass'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

class DateRanges extends Component {
    state = {
        ranges: [
            {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }
        ]
    }

    render () {
        return (
            <form
                className={css.block}
                onSubmit={(event) => {
                    event.preventDefault()
                    this.props.add(this.state.ranges)
                }}
            >
                <DateRange
                    editableDateInputs={false}
                    onChange={item => this.setState({ranges: [item.selection]})}
                    ranges={this.state.ranges}
                    locale={ru}
                />
                <input
                    type="submit"
                    className={css.submit}
                    value='Добавить'
                />
            </form>
        )
    }
}

export default DateRanges