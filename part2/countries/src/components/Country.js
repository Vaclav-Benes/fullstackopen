import React from 'react'

import Weather from './Weather';

const Country = ({ country }) => {

    console.log(country);

    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <p><b>Spoken languages:</b></p>

            <ul>
                {Object.keys(country.languages).map((key, index) => {
                    return (<li key={key}> {country.languages[key]} </li>)
                })}
            </ul>

            
            <img src={country.flags.png} style={{ width: "150px" }} alt={country.name.official} />
             
             <h2>Weather in {country.capital}</h2>
             <Weather capital={country.capital} />
        
        </div>
    )

}

export default Country