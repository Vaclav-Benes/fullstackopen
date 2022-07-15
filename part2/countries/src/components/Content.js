import React from 'react'

import Country from './Country'

const Content = ({ countries }) => {

    if (countries.length === 0) {
        return (
            <h3>No data available!</h3>
        )
    }

    if (countries.length > 10) {
        return (
            <p>
                Too many matches, specify another filter!
            </p>
        )
    }

    if (countries.length > 2) {
        return (
            <ul>
                {countries.map((country) => {
                    return (
                        <li key={country.name.official}> {country.name.official} </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <Country country={countries[0]} />
    )
}

export default Content