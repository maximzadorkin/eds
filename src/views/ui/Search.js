import React from 'react'
import uniqid from 'uniqid'
import css from './Search.module.sass'
import ButtonIcon from "./ButtonIcon.js"

const SearchItem = (props) =>
    <option
        key={uniqid()}
        className={css.listItem}
        value={props}
    >
        {props}
    </option>

class Search extends React.Component {

    //TODO
    componentDidMount = () => this.props.handler(this.props.value)

    form = (event, callback) => {
        event.preventDefault()
        callback()
    }

    render() {
        return (
            <form className={css.block}
                onSubmit={(event) =>
                    this.form(event, this.props.close)}>

                <div className={css.header} onClick={this.props.close}>
                    {this.props.close ? <ButtonIcon icon='&#x42;' /> : null}
                    <label className={css.title}>
                        {this.props.title}
                    </label>
                </div>

                <input
                    type="text"
                    className={css.inputData}
                    value={this.props.value}
                    onChange={(event) =>
                        this.props.handler(event.target.value)}
                    autoFocus={true}
                />

                <select
                    className={css.list} size={this.props.listSize}
                    onChange={(event) =>
                        this.props.handler(event.target.selectedOptions[0].value)}
                >
                    {this.props.items.map(SearchItem)}
                </select>

            </form>
        )
    }
}

export default Search