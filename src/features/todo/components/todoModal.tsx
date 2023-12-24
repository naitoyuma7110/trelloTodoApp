import React, { useEffect, useState } from 'react'
import { Select, Option } from '@material-tailwind/react'

import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../reducers/modalSlice'
import { RootState, Status, Statuses, Todo } from '@/features/todo/types'
import { FaCheckCircle } from 'react-icons/fa'
import { TbProgress } from 'react-icons/tb'
import { RiZzzFill } from 'react-icons/ri'

const TodoModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.modals.editModalIsOpen)
  const editTodo = useSelector((state: RootState) => state.modals.todo)

  const [todo, setTodo] = useState<Todo>(editTodo)

  const handleCloseModalOnClick = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    dispatch(closeModal())
  }

  const handlerTodoTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = { ...todo }
    newTodo.title = event.target.value
    setTodo(newTodo)
  }

  const handlerTodoStatusOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTodo = { ...todo }
    newTodo.status = event.target.value as Status
    setTodo(newTodo)
  }

  // 状態に応じて各クラス名、テキスト、アイコンを取得する
  let styles = {
    state: '',
    color: '',
    iconDom: <></>,
  }

  switch (todo.status) {
    case 'Done':
      styles.state = '完了'
      styles.color = 'green'
      styles.iconDom = <FaCheckCircle className='w-6 h-6 text-white fill-current' />
      break
    case 'Progress':
      styles.state = '対応中'
      styles.color = 'blue'
      styles.iconDom = <TbProgress className='w-6 h-6 text-white fill-current' />
      break
    case 'Incomplete':
      styles.state = '未対応'
      styles.color = 'gray'
      styles.iconDom = <RiZzzFill className='w-6 h-6 text-white fill-current' />
      break
  }

  return (
    <>
      {isOpen && (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-1/2 my-6 mx-auto max-w-md'>
              {/*content*/}
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ${
                  isOpen && 'animate-slide-in-bck-center'
                }`}
              >
                {/*header*/}
                <div className='flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t'>
                  <h4 className='text-lg text-gray-800'>編集</h4>
                </div>
                {/*body*/}
                <form className='p-4 md:p-5'>
                  <div className='grid gap-4 mb-4 grid-cols-2'>
                    <div className='col-span-2'>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>タイトル</label>
                      <input
                        type='text'
                        name='title'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Todoタイトル'
                        value={todo.title}
                        onChange={(e) => handlerTodoTitleOnChange(e)}
                      />
                    </div>
                    <div className='w-full'>
                      <label className='block text-sm font-medium text-gray-900 dark:text-white '>状態</label>
                      <select
                        value={todo.status}
                        onChange={(e) => handlerTodoStatusOnChange(e)}
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2  border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer`}
                      >
                        {Statuses.map((status: Status) => {
                          return (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className='col-span-2'>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>内容</label>
                      <textarea
                        id='description'
                        rows={4}
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='詳細'
                      ></textarea>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <button
                      className=' text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={(e) => handleCloseModalOnClick(e)}
                    >
                      キャンセル
                    </button>
                    <button
                      type='submit'
                      className=' text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      保存
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </>
  )
}

export default TodoModal
