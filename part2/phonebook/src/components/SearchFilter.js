import React from 'react'

const SearchFilter = ({ value, onChange }) => {

    return (
        <div>
            Filter including: <input value={value} onChange={onChange} placeholder='Filter parameters' />
        </div>
    )

}

export default SearchFilter