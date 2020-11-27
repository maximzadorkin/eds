import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import {addSpecificationItem, removeSpecificationItem, setSpecsLabelItem} from '../../redux/actions/actions.js'
import ButtonIcon from '../ui/ButtonIcon.js'
import ListWithDeleteElements from '../ui/ListWithDeleteElements.js'
import Search from '../ui/Search.js'
import css from './Specification.module.sass'
import {ADDRESSES, CLASSIFIERS, COMPANIES} from '../../constants'

class Specification extends Component {

    state = {
        searchActive: false,
        itemActive: 0
    }

    addItem = (value) => {
        this.props.addItem(value)
        this.setState({searchActive: false})
    }

    open = index =>
        this.setState({itemActive: index, searchActive: true})

    close = () =>
        this.setState({searchActive: false})

    render() {

        const finder = (show, size = 5) => !show ? null
            : (<Search
                title={this.props.parts[this.state.itemActive].label}
                handler={value =>
                    this.props.setSpecsLabelItem(this.state.itemActive, value)}
                value={this.props.parts[this.state.itemActive].item}
                items={this.props.searches}
                listSize={size}
                close={this.close}
            />)

        const labels = hidden => hidden ? null
            : this.props.parts.map((l,i) =>
                <span className={css.link}
                      onClick={() => this.open(i)}
                      key={uniqid()} >
                    {l.label} [{l.item}]
                </span>)

        const alwaysOpenSearch = this.props.alwaysOpenSearch
        let choiseBlock = [finder(this.state.searchActive), labels(this.state.searchActive)]
        if (alwaysOpenSearch) {
            choiseBlock = [finder(true, 10)]
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
                    deleteHandler={this.props.deleteItem}
                    style={{height: '440px'}}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const layer = state.navigation.active
    const specState = state.specification
    let items
    switch (layer) {
        case COMPANIES:
            items = specState.companies
            break
        case CLASSIFIERS:
            items = specState.classifiers
            break
        case ADDRESSES:
            items = specState.addresses
    }
    return {
        parts: state.specification.parts,
        items: items.sort(),
        searches: state.specification.searches
    }
}

const mapDispatchToProps = dispatch => ({
    addItem: value => dispatch(addSpecificationItem(value)),
    deleteItem: value => dispatch(removeSpecificationItem(value)),
    setSpecsLabelItem: (index, item) => dispatch(setSpecsLabelItem(index, item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Specification)