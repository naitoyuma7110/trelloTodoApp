import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Todo } from '@/features/todo/types'
import type { PayloadAction } from '@reduxjs/toolkit'

// ReduxはPrimiseオブジェクトを解決できないため、外部APIの使用など非同期処理で取得する値はReduxの状態管理のサイクルに含む事ができない
// そのためmiddlewareを介す必要となる
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchTodoAll = createAsyncThunk('todos/fetchAll', async () => {
  // 非同期処理を実行し、結果を返す
  const response = await fetch('/api/todo/test', {
    method: 'GET',
  })
  const data = await response.json()
  return data
})

const todoData: Todo[] = [
  {
    id: '1',
    title: '1',
    content: '1',
    status: 'Done',
  },
  {
    id: '2',
    title: '2',
    content: '2',
    status: 'Done',
  },
  {
    id: '3',
    title: '3',
    content: '3',
    status: 'Done',
  },
  {
    id: '4',
    title: '4',
    content: '4',
    status: 'Progress',
  },
  {
    id: '5',
    title: '5',
    content: '5',
    status: 'Incomplete',
  },
  {
    id: '6',
    title: '6',
    content: '6',
    status: 'Incomplete',
  },
]

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: todoData,
  },
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      // const newTodos: Todo[] = action.payload
      // 番号を振りなおす(AddTodoでは配列数+1のidが割り振られるため欠番があると重複する)
      const newTodos = action.payload.map((todo, index) => {
        return {
          ...todo,
          id: (index + 1).toString(),
        }
      })
      console.log('reducer')
      state.todos = newTodos
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const updateTodo = action.payload
      const updatedTodos = state.todos.map((todo) => (todo.id === updateTodo.id ? { ...todo, ...updateTodo } : todo))
      console.log('reducer')
      state.todos = updatedTodos
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo = action.payload
      newTodo.id = (state.todos.length + 1).toString()
      const newTodos = [...state.todos, newTodo]
      console.log('reducer')
      state.todos = newTodos
    },
    removeTodoById: (state, action: PayloadAction<Todo['id']>) => {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload)
      // 番号を振りなおす(AddTodoでは配列数+1のidが割り振られるため欠番があると重複する)
      console.log('reducer')
      state.todos = newTodos.map((todo, index) => {
        return {
          ...todo,
          id: (index + 1).toString(),
        }
      })
    },
  },
  extraReducers: (builder) => {
    // 非同期処理の結果を処理する
    builder.addCase(fetchTodoAll.fulfilled, (state, action) => {
      const newTodos: Todo[] = action.payload
      // 番号を振りなおす(AddTodoでは配列数+1のidが割り振られるため欠番があると重複する)
      state.todos = newTodos.map((todo, index) => {
        return {
          ...todo,
          id: (index + 1).toString(),
        }
      })
    })
  },
})

export const { setTodos, updateTodo, addTodo, removeTodoById } = todoSlice.actions

export default todoSlice.reducer
