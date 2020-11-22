import React from 'react'
import { connect } from 'react-redux'
import {addStatusesToSelects, removeStatusesFromSelects} from '../../redux/actions/actions.js'
import Button from '../ui/Button.js'
import ListWithDeleteElements from '../ui/ListWithDeleteElements.js'
import SelectList from '../ui/SelectList.js'
import css from './Statuses.module.sass'
import colors from '../ui/Colors.module.sass'

const TITLE = 'Выберите статусы заявок',
      ErrorMessage = 'Выберите хотя бы один статус',
      ADD_ALL = 'Добавить все',
      DELETE_ALL = 'Удалить все'

const styled = {
    warningSpan: {
        display: 'block',
        marginBottom: 5,
        padding: 10,
        borderRadius: 5,
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: 15,
        textAlign: 'center'
    }
}

const Statuses = props =>
    <div className={css.section}>
        <h3 className={css.title}>{TITLE}</h3>
        {
            props.selects.length === 0
            ? <span className={`${colors['light-color']} ${colors['orange-bg']}`}
                    style={styled.warningSpan}
                >
                    {ErrorMessage}
                </span>
            : null
        }
        <div className={css.content}>
            <div className={css.block}>
                <SelectList
                    active={0}
                    items={props.statuses}
                    onChange={value => props.addStatuses([value])}
                    className={css.list}
                />
                <Button
                    text={ADD_ALL}
                    onClick={() => props.addStatuses(props.statuses)}
                    className={css.btn}
                />
            </div>
            <div className={css.block}>
                <ListWithDeleteElements
                    items={props.selects}
                    deleteHandler={value => props.removeStatuses([value])}
                    className={css.list}
                />
                <Button
                    text={DELETE_ALL}
                    onClick={() => props.removeStatuses(props.selects)}
                    className={`${css.btn} ${css.red}`}
                />
            </div>
        </div>
    </div>

const mapStateToProps = state => {
    const selects = state.statuses.selects.sort()
    const statuses = state.statuses.statuses
        .sort().filter(s => !selects.includes(s))
    const props = {statuses, selects}
    return props
}

const mapDispatchToProps = dispatch => ({
    addStatuses: value => dispatch(addStatusesToSelects(value)),
    removeStatuses: value => dispatch(removeStatusesFromSelects(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Statuses)