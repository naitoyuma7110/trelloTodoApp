import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [
      {
        id: '1',
        title: 'Reduxで取得する長いタイトルのTodo',
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
        content: 'TODO内容の4番目はDONETODO内容の4番目はDONETODO内容の4番目はDONE',
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
        title: 'タイトル3',
        content: 'TODO内容の3番目',
        status: 'Incomplete',
      },
      {
        id: '8',
        title: '4番目',
        content: '差し込みIncomplete',
        status: 'Incomplete',
      },
      {
        id: '9',
        title: '5番目のTODO',
        content: 'TODO内容の4番目はDONETODO内容の4番目はDONETODO内容の4番目はDONE',
        status: 'Done',
      },
      {
        id: '10',
        title: '6番目のTODO',
        content: 'TODO内容の4番目はDONE',
        status: 'Done',
      },
    ],
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    updateTodo: (state, action) => {
      const updateTodo = action.payload
      const updatedTodos = state.todos.map((todo) => (todo.id === updateTodo.id ? { ...todo, ...updateTodo } : todo))
      state.todos = updatedTodos
    },
    addTodo: (state, action) => {
      const newTodo = action.payload
      newTodo.id = (state.todos.length + 1).toString()
      state.todos.push(newTodo)
    },
    removeTodoById: (state, action) => {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload)
      // 番号を振りなおす
      state.todos = newTodos.map((todo, index) => {
        return {
          ...todo,
          id: (index + 1).toString(),
        }
      })
    },
  },
})

export const { setTodos, updateTodo, addTodo, removeTodoById } = todoSlice.actions

export default todoSlice.reducer
