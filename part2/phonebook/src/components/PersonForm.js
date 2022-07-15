import React from 'react'

const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange} placeholder='Enter new name' />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} placeholder='Enter new number' />
            </div>
            <div>
                <button type="submit" onClick={onSubmit}>Add person </button>
            </div>
        </form>
    )
}

export default PersonForm