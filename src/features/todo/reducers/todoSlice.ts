import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [
      {
        id: '1',
        title: 'Reduxで取得',
        content: 'TODO内容はここに記載します。',
        status: 'Done',
      },
      {
        id: '2',
        title: 'タイトル2',
        content: 'TODO内容の二番目',
        status: 'Progress',
      },
      {
        id: '3',
        title: 'タイトル3',
        content: 'TODO内容の3番目',
        status: 'Incomplete',
      },
      {
        id: '4',
        title: '4番目',
        content: '差し込みIncomplete',
        status: 'Incomplete',
      },
      {
        id: '5',
        title: '5番目のTODO',
        content: 'TODO内容の4番目はDONE',
        status: 'Done',
      },
      {
        id: '6',
        title: '6番目のTODO',
        content: 'TODO内容の4番目はDONE',
        status: 'Done',
      },
      {
        id: '7',
        title: '7番目のTODO',
        content: 'TODO内容の4番目はDONE',
        status: 'Done',
      },
      {
        id: '8',
        title: '8番目のTODO',
        content: 'TODO内容の4番目はDONE',
        status: 'Done',
      },
      {
        id: '9',
        title: '9番目のTODO',
        content: 'TODO内容の4番目はDONE',
        status: 'Done',
      },
    ],
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    addTodo: (state, action) => {
      const newTodo = action.payload
      newTodo.id = (state.todos.length + 1).toString()
      state.todos.push(newTodo)
    },
  },
})

export const { setTodos, addTodo } = todoSlice.actions

export default todoSlice.reducer
