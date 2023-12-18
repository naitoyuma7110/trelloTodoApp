import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/reduxSample/reducers/counterSlice'
import userReducer from '@/features/reduxSample/reducers/userSlice'
import todoReducer from '@/features/todo/reducers/todoSlice'
import modalReducer from '@/features/todo/reducers/modalSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    todos: todoReducer,
    modals: modalReducer,
  },
})
