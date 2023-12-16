import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
  },
})

// PayloadAction使用してincrease,decreaseの戻り値型を定義
export type CounterAction = PayloadAction<number>

// counterSliceというReduxオブジェクトが生成される
export const { setTodos } = todoSlice.actions

export default todoSlice.reducer
