export type Todo = {
  id: string
  title: string
  content: string
  status: Status
}

export type Status = 'Done' | 'Progress' | 'Incomplete'
export const Statuses: Status[] = ['Incomplete', 'Progress', 'Done']

export type StatusValues = {
  status: Status
  color: string
  iconDom: JSX.Element
}

export type RootState = {
  todos: {
    todos: Todo[]
    setTodos: (todos: Todo[]) => void
  }
  modals: {
    editModalIsOpen: boolean
    confirmModalIsOpen: boolean
    todo: Todo
  }
}
