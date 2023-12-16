import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/reduxSample/reducers/counterSlice'
import userReducer from '@/features/reduxSample/reducers/userSlice'
import todoReducer from '@/features/todo/reducers/todoSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    todos: todoReducer,
  },
})
