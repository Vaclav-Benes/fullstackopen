import React from 'react'

const successStyle = {
    color: 'green',
    backgroundColor: 'lightGrey',
    border: '5px solid',
    borderRadius: '5px',
    fontSize: '2em',
    padding: '5px'
}

const errorStyle = {
    color: 'red',
    backgroundColor: 'lightGrey',
    border: '5px solid',
    borderRadius: '5px',
    fontSize: '2em',
    padding: '5px'
}

const Notification = ({ message }) => {

    if (message === null || message === '') {
        return (null)
    }

    if (message.includes('Error')) {
        return (
            <div className='success' style={errorStyle}>
                {message}
            </div>
        )
    } else {
        return (
            <div className='error' style={successStyle}>
                {message}
            </div>
        )
    }
}

export default Notification