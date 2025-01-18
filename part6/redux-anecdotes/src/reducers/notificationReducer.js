import { createSlice } from "@reduxjs/toolkit"


const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification (state, action) {
            return action.payload
        },
        removeNotification () {
            return ''
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(createNotification(message))
        setTimeout(() => {
        dispatch(removeNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer