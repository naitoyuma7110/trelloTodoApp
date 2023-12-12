import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/redux/counter'

export const store = configureStore({
  reducer: { counter: counterReducer },
})
