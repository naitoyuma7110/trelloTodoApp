import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Todo } from '@/features/todo/types'

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
]

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: todoData,
  },
  reducers: {
    setTodos: (state, action) => {
      const newTodos: Todo[] = action.payload
      // 番号を振りなおす(AddTodoでは配列数+1のidが割り振られるため欠番があると重複する)
      state.todos = newTodos.map((todo, index) => {
        return {
          ...todo,
          id: (index + 1).toString(),
        }
      })
    },
    updateTodo: (state, action) => {
      const updateTodo = action.payload
      const updatedTodos = state.todos.map((todo) => (todo.id === updateTodo.id ? { ...todo, ...updateTodo } : todo))
      state.todos = updatedTodos
    },
    addTodo: (state, action) => {
      const newTodo = action.payload

      // newTodo.id = (state.todos.length + 1).toString()
      // state.todos.push(newTodo)
      const updatedTodos = [...state.todos, { ...newTodo, id: (state.todos.length + 2).toString() }]
      state.todos = updatedTodos
    },
    removeTodoById: (state, action) => {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload)
      // 番号を振りなおす(AddTodoでは配列数+1のidが割り振られるため欠番があると重複する)
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
