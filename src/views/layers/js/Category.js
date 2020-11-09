import React from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import { setCategory } from '../../../redux/actions/actions.js'
import css from '../sass/Category.module.sass'

const Category = props =>
    <div className={css.section}>
        <span className={css.text}>Выбранная категория: {props.active}</span>
        <select className={css.select} defaultValue={props.active}
            onChange={(event) =>
            props.onChange(event.target.selectedOptions[0].value)} size={3}>
            {
                props.categories.map(c =>
                <option value={c} key={uniqid()}>{c}</option>)
            }
        </select>
    </div>

const mapStateToProps = state => {
    const props = {
        categories: state.specification.categories,
        active: state.specification.category
    }
    return props
}

const mapDispatchToProps = dispatch => {
    const props = {
        onChange: value => dispatch(setCategory(value))
    }
    return props
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)