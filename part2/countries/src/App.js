import React from 'react'
import { useState, useEffect } from 'react'

import axios from 'axios'

import Filter from './components/Filter'
import Content from './components/Content'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(()=>{

    axios
      .get('https://restcountries.com/v3.1/all')
      .then((data) => {
        //console.log(data.data)
        setAllCountries(data.data)
        setFilteredCountries(data.data)
      })

  }, [])

  const handleFilterChange = (e) => {

    setNewFilter(e.target.value)

    if(newFilter) {
      const regex = new RegExp(newFilter, 'i')
      const fCountries = () => allCountries.filter(country => country.name.official.match(regex))
      setFilteredCountries(fCountries)
    } else {
      setFilteredCountries(allCountries)
    }

  }

  return(

    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Content countries={filteredCountries} />
    </div>

  )
}

export default App