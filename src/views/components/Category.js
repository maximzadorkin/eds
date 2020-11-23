import React from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import { setCategory } from '../../redux/actions/actions.js'
import css from './Category.module.sass'



const Category = props =>
    <div className={css.section}>
        <span className={css.text}>Выбранная категория: {props.active}</span>
        <select className={css.select} value={props.active}
            onChange={(event) =>
            props.onChange(event.target.selectedOptions[0].value)} size={3}>
            {
                props.categories.map(c =>
                <option value={c} key={uniqid()}>{c}</option>)
            }
        </select>
    </div>

const mapStateToProps = state => ({
    categories: state.specification.categories,
    active: state.specification.category
})

const mapDispatchToProps = dispatch => ({
    onChange: value => dispatch(setCategory(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)