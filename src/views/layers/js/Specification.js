import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'
import {
    addSpecificationItem,
    removeSpecificationItem,
    setSpecsLabelItem
} from '../../../redux/actions/actions.js'
import ButtonIcon from '../../components/js/ButtonIcon.js'
import ListWithDeleteElements from '../../components/js/ListWithDeleteElements.js'
import Search from '../../components/js/Search.js'
import css from '../sass/Specification.module.sass'

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

        const search = !this.state.searchActive ? null
            : (<Search
                title={this.props.parts[this.state.itemActive].label}
                handler={value =>
                    this.props.setSpecsLabelItem(this.state.itemActive, value)}
                value={this.props.parts[this.state.itemActive].item}
                items={this.props.searches}
                listSize={5}
                close={this.close}
            />)

        const labels = this.state.searchActive ? null
            : this.props.parts.map((l,i) =>
                <span className={css.link}
                      onClick={() => this.open(i)}
                      key={uniqid()} >
                    {l.label} [{l.item}]
                </span>)

        return (
            <div className={css.section}>
                <div className={css.workSection}>
                    <div className={css.labels}>
                        {search}
                        {labels}
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

const mapStateToProps = state => ({
    parts: state.specification.parts,
    items: state.specification.items.sort(),
    searches: state.specification.searches
})

const mapDispatchToProps = dispatch => ({
    addItem: value => dispatch(addSpecificationItem(value)),
    deleteItem: value => dispatch(removeSpecificationItem(value)),
    setSpecsLabelItem: (index, item) => dispatch(setSpecsLabelItem(index, item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Specification)