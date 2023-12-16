import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrease, increase } from '@/features/reduxSample/reducers/counterSlice'
import { setUsers } from '@/features/reduxSample/reducers/userSlice'
import { RootState } from '@/features/reduxSample/types/redux'

const CounterChild = () => {
  const count = useSelector((state: RootState) => state.counter.count)
  const users = useSelector((state: RootState) => state.users.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      console.log(data)
      dispatch(setUsers(data))
    }
    getPosts()
  }, [dispatch])

  return (
    <>
      <div>count:{count}</div>
      <button className='p-2 mx-5  border border-blue-500' onClick={() => dispatch(increase())}>
        Up
      </button>
      <button className='p-2 mx-5  border border-red-500' onClick={() => dispatch(decrease())}>
        Down
      </button>
      <h2>User</h2>
      {users && users.map((user, i: number) => <div key={i}>{user.name}</div>)}
    </>
  )
}

export default CounterChild
