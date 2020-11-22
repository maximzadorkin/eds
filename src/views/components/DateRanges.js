import React, { Component } from 'react'
import { DateRange } from 'react-date-range'
import { ru } from 'date-fns/locale'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './DateRanges.sass'

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
                className='block'
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
                    className='submit'
                    value='Добавить'
                />
            </form>
        )
    }
}

export default DateRanges