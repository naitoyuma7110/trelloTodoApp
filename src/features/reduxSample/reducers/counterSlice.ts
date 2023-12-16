import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increase: (state) => {
      state.count += 1
    },
    decrease: (state) => {
      state.count -= 1
    },
  },
})

// PayloadAction使用してincrease,decreaseの戻り値型を定義
export type CounterAction = PayloadAction<number>

// counterSliceというReduxオブジェクトが生成される
export const { increase, decrease } = counterSlice.actions

export default counterSlice.reducer
