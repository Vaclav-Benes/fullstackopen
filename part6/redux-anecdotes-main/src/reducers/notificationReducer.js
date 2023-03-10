import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        hideNotification(state, action) {
            return action.payload
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(hideNotification(''))
        }, 1000 * timeout)
    }
}

export default notificationSlice.reducer