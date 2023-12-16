export type Todo = {
  id: string
  title: string
  content: string
  status: Status
}

export type Status = 'Done' | 'Progress' | 'Incomplete'
