import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/reduxSample/reducers/counterSlice'
import userReducer from '@/features/reduxSample/reducers/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
  },
})
