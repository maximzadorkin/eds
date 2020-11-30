import React from 'react'
import * as uniqid from 'uniqid'
import sass from './Table.module.sass'

const Table = props => {

    const styled = {
        div: {
            width: props.width,
            height: props.height
        }
    }

    const getLine = items => items.map(i => (
        <td className={sass.td} key={uniqid()} dangerouslySetInnerHTML={{__html: i}}/>
    ))

    const lines = props.items.map(i => (
        <tr className={sass.tr} key={uniqid()}>{getLine(i)}</tr>
    ))

    return (
        <div style={styled.div} className={sass.div}>
            <table className={sass.table}>
                <tbody>{lines}</tbody>
            </table>
        </div>
    )
}

export default Table