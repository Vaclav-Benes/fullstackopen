import React from 'react'

const Persons = ({ filteredPersons, allPersons, deletePerson }) => {

    const personsToDisplay = filteredPersons.length === 0 ? allPersons : filteredPersons

    return (
        <ul>
            {personsToDisplay.map((person) => {
                return (
                    <li key={person.id}>
                        {person.name}   {person.number}
                        <button onClick={() => deletePerson(person.id)}>Delete</button>
                    </li>
                )
            })}
        </ul>
    )

}

export default Persons