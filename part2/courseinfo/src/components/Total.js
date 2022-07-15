import React from 'react'

const Total = function ({ parts }) {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (<p><b>Number of exercises {total}</b></p>)
}

export default Total