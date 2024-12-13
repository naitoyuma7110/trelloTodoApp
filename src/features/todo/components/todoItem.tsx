import { FC } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { FaCheckCircle } from 'react-icons/fa'
import { TbProgress } from 'react-icons/tb'
import { RiZzzFill } from 'react-icons/ri'
import { IoArchive } from 'react-icons/io5'
import { Todo } from '@/features/todo/types'
import { useDispatch } from 'react-redux'
import { removeTodoById } from '../reducers/todoSlice'
import { closeModal, openEditModal } from '../reducers/modalSlice'

type TodoItemProps = {
  todo: Todo
  isSortable?: boolean
}

const TodoItem = (props: TodoItemProps) => {
  const dispatch = useDispatch()

  const handleRemoveOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    dispatch(removeTodoById(props.todo.id))
  }

  const handleTodoOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(props.todo.id)
    dispatch(openEditModal(props.todo))
  }

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.todo.id,
  })

  // 状態に応じて各クラス名、テキスト、アイコンを取得する
  let statusValues = {
    state: '',
    color: '',
    iconDom: <></>,
  }

  const style = {
    transform: CSS.Transform.toString(transform),
  }

  switch (props.todo.status) {
    case 'Done':
      statusValues.state = '完了'
      statusValues.color = 'green'
      statusValues.iconDom = <FaCheckCircle className='w-6 h-6 text-white fill-current' />
      break
    case 'Progress':
      statusValues.state = '対応中'
      statusValues.color = 'blue'
      statusValues.iconDom = <TbProgress className='w-6 h-6 text-white fill-current' />
      break
    case 'Incomplete':
      statusValues.state = '未対応'
      statusValues.color = 'blue-gray'
      statusValues.iconDom = <RiZzzFill className='w-6 h-6 text-white fill-current' />
      break
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={props.isSortable ? style : { cursor: 'default' }}>
      <div
        id={props.todo.id}
        className='flex w-full border border-gray-300 overflow-hidden bg-white rounded-lg shadow-md select-none'
        onClick={handleTodoOnClick}
      >
        <div className={`flex items-center justify-center w-12 bg-${statusValues.color}-500`}>
          {statusValues.iconDom}
        </div>

        <div className='px-2 p-1 w-full'>
          <div className='px-1'>
            <div className='flex justify-start items-center'>
              <div className='flex-auto '>
                <span className='text-sm text-gray-700'>{props.todo.title}</span>
              </div>
              <span className={`font-semibold text-sm whitespace-pre text-${statusValues.color}-500`}>
                {statusValues.state}
                {props.todo.status === 'Done' && (
                  <button
                    type='button'
                    className='text-white bg-red-500  hover:bg-red-700  focus:ring-red-300 font-medium rounded-full text-xs p-1 ms-1 text-center items-center'
                    onClick={(e) => handleRemoveOnClick(e)}
                  >
                    <span>
                      <IoArchive />
                    </span>
                  </button>
                )}
              </span>
            </div>
            <div className='text-xs my-1 line-clamp-2 text-gray-600'>{props.todo.content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoItem
