export type Todo = {
  id: string
  title: string
  content: string
  status: Status
}

export type Status = 'Done' | 'Progress' | 'Incomplete'

export type RootState = {
  todos: {
    todos: Todo[]
    setTodos: (todos: Todo[]) => void
  }
}
