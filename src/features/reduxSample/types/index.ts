// Stateの型定義
export interface CounterState {
  count: number
}

export interface User {
  id: number
  name: string
}

export interface UserState {
  users: User[]
}

// RootStateの型定義
export interface RootState {
  counter: CounterState
  users: UserState
}
