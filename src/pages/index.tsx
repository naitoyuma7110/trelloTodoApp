import TodoListForm from '@/features/todo/components/todoListForm'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <Provider store={store}>
      <div className='flex justify-center'>
        <div className='m-5 w-auto'>
          <TodoListForm />
        </div>
      </div>
    </Provider>
  )
}
