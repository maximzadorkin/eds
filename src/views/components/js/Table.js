import React from 'react'
import * as uniqid from 'uniqid'

const Table = props => {

    const styled = {
        div: {
            width: props.width,
            height: props.height,
            overflow: 'auto',
            border: '1px solid #eff2f7',
            borderRadius: '0 0 5px 5px'
        },
        table: {
            borderCollapse: 'collapse'
        },
        td: {
            maxWidth: 200,
            padding: 10,
            border: '1px solid #eff2f7',
            verticalAlign: 'middle',
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 15,
            fontWeight: 100,
            color: '#333'
        }
    }

    const getLine = items => items.map(i => (
        <td style={styled.td} key={uniqid()}>{i}</td>
    ))

    const lines = props.items.map(i => (
        <tr key={uniqid()}>{getLine(i)}</tr>
    ))

    return (
        <div style={styled.div}>
            <table style={styled.table}>
                <tbody>{lines}</tbody>
            </table>
        </div>
    )
}

export default Table