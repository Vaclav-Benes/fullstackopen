import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personsService from './services/personsService'

const App = () => {
  const [allPersons, setAllPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {

    personsService
      .getAll()
      .then(initialPersons => {
        setAllPersons(initialPersons.data);
      }
      )

  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const person = allPersons.filter((person) => person.name === newName)
    const uPerson = { ...person[0], number: newNumber }

    if (person.length !== 0) {
      if (window.confirm(`${person[0].name} is already in phonebook!\nReplace old number with new?`)) {
        personsService
          .update(uPerson.id, uPerson)
          .then(rPerson => {
            setAllPersons(allPersons.map(person => person.id !== uPerson.id ? person : rPerson))
            
            setMessage(`${rPerson.name} was successfully updated!`)
            
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            console.log(error)
            setAllPersons(allPersons.filter(person => person.id !== uPerson.id))
            setMessage(
              `Error: ${uPerson.name} was already deleted from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {

      const newPerson = { name: newName, number: newNumber }

      personsService
        .create(newPerson)
        .then(rPerson => {
          setAllPersons(allPersons.concat(rPerson))
          setMessage(`${rPerson.name} was successfully added!`)
            
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
        .catch((error) => {
          setMessage(
            `Error: ${error.response.data.error}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

    }


    setNewName("")
    setNewNumber("")
  }

  const deletePerson = (id) => {
    const fPerson = allPersons.filter(person => person.id === id)
    const personName = fPerson[0].name
    const personId = fPerson[0].id

    if (window.confirm(`Delete ${personName} ?`)) {
      personsService
        .remove(personId)

      setMessage(`${personName} successfully deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setAllPersons(allPersons.filter(person => person.id !== personId))
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

    const regex = new RegExp(newFilter, 'i');
    const filterPersons = () => allPersons.filter(person => person.name.match(regex))

    setFilteredPersons(filterPersons)
  }


  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} />

      <h2>Filter phonebook</h2>

      <SearchFilter value={newFilter} onChange={handleFilterChange} />

      <h2>Add new person</h2>

      <PersonForm onSubmit={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} allPersons={allPersons} deletePerson={deletePerson} />

    </div>
  )
}

export default App