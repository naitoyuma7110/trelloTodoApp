import TodoListForm from '@/features/todo/components/todoListForm'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>TODO APP</title>
      </Head>
      <Provider store={store}>
        <div className='flex justify-center'>
          <div className='m-5 w-auto'>
            <TodoListForm />
          </div>
        </div>
      </Provider>
    </>
  )
}
