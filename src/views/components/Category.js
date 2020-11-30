import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import {
    addCategoryItem,
    removeCategoryItem,
    searchCategories,
    setCategorySubItem
} from '../../redux/actions/actions.js'
import ButtonIcon from '../ui/ButtonIcon.js'
import ListWithDeleteElements from '../ui/ListWithDeleteElements.js'
import Search from '../ui/Search.js'
import css from './Category.module.sass'

class Category extends Component {

    state = {
        searchActive: false,
        itemActive: 0,
        searchId: uniqid()
    }

    addItem = (value) => {
        this.props.addItem(value, this.props.layer)
        const empty = ''
        this.props.searchCategories(this.state.itemActive, empty)
        this.setState({searchActive: false})
    }

    open = index =>
        this.setState({itemActive: index, searchActive: true})

    close = () =>
        this.setState({searchActive: false})

    render() {

        const finder = (show, size = 5) => !show ? null
            : (<Search
                title={this.props.steps[this.state.itemActive].label}
                handler={value =>
                    this.props.setCategorySubItem(this.state.itemActive, value, this.props.layer)}
                search={(value) => this.props.searchCategories(this.state.itemActive, value)}
                value={this.props.steps[this.state.itemActive].item}
                items={this.props.searches}
                listSize={size}
                close={this.close}
                key={this.state.searchId}
            />)

        const labels = hidden => hidden ? null
            : this.props.steps.map((l,i) =>
                <span className={css.link}
                      onClick={() => this.open(i)}
                      key={uniqid()} >
                    {l.label} [{l.item}]
                </span>)

        const alwaysOpenSearch = this.props.alwaysOpenSearch
        let choiseBlock = [finder(this.state.searchActive), labels(this.state.searchActive)]
        if (alwaysOpenSearch) {
            choiseBlock = [finder(true, 7)]
        }

        return (
            <div className={css.section}>
                <div className={css.workSection}>
                    <div className={css.labels}>
                        {choiseBlock}
                    </div>
                    <div className={css.addBtn}>
                        <ButtonIcon
                            icon='&#x59;'
                            onClick={this.addItem}
                            lightHover={true}
                        />
                    </div>
                </div>
                <ListWithDeleteElements
                    items={this.props.items}
                    deleteHandler={(item) => this.props.deleteItem(item, this.props.layer)}
                    style={{height: '440px'}}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const layer = state.navigation.active
    const category = state.categories[layer]
    return {
        steps: category.steps,
        items: category.items.sort(),
        searches: state.categories.searches,
        layer
    }
}

const mapDispatchToProps = dispatch => ({
    addItem: (value, layer) => dispatch(addCategoryItem(value, layer)),
    deleteItem: (value, layer) => dispatch(removeCategoryItem(value, layer)),
    setCategorySubItem: (indexStep, item, layer) => dispatch(setCategorySubItem(indexStep, item, layer)),
    searchCategories: (stepIndex, searchedValue) => dispatch(searchCategories(stepIndex, searchedValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)