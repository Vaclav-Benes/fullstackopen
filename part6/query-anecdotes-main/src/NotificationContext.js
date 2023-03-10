import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return state
        case 'HIDE_NOTIFICATION':
            return state
        default:
            return state
    }
}

export const setNotification = (notification, displayTime) => {
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            notification,
        })

        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
                notification: null
            })
        }, displayTime * 1000)
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext