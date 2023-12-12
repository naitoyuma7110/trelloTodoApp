import { useSelector, useDispatch } from 'react-redux'
import { decrease, increase } from '@/redux/counter'

// Stateの型定義
interface CounterState {
  count: number
}

// RootStateの型定義
interface RootState {
  counter: CounterState
}
const CounterChild = () => {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()
  return (
    <>
      <div>count:{count}</div>
      <button className='p-2 mx-5  border border-blue-500' onClick={() => dispatch(increase())}>
        Up
      </button>
      <button className='p-2 mx-5  border border-red-500' onClick={() => dispatch(decrease())}>
        Down
      </button>
    </>
  )
}

export default CounterChild
