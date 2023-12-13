import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/redux/counterSlice'
import userReducer from '@/redux/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
  },
})
