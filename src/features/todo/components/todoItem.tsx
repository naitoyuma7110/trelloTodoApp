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

type TodoItemProps = {
  todo: Todo
  isSortable?: boolean
}

const TodoItem = (props: TodoItemProps) => {
  const dispatch = useDispatch()

  const handleRemoveOnClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    console.log(`OnClick id${id}`)
    dispatch(removeTodoById(id))
  }

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.todo.id,
  })

  // 状態に応じて各クラス名、テキスト、アイコンを取得する
  let statusValues = {
    state: '',
    textColor: '',
    bgColor: '',
    iconDom: <></>,
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  switch (props.todo.status) {
    case 'Done':
      statusValues.state = '完了'
      statusValues.textColor = 'text-emerald-500'
      statusValues.bgColor = 'bg-emerald-500'
      statusValues.iconDom = <FaCheckCircle className='w-6 h-6 text-white fill-current' />
      break
    case 'Progress':
      statusValues.state = '対応中'
      statusValues.textColor = 'text-blue-600'
      statusValues.bgColor = 'bg-blue-600'
      statusValues.iconDom = <TbProgress className='w-6 h-6 text-white fill-current' />
      break
    case 'Incomplete':
      statusValues.state = '未対応'
      statusValues.textColor = 'text-gray-500'
      statusValues.bgColor = 'bg-gray-600'
      statusValues.iconDom = <RiZzzFill className='w-6 h-6 text-white fill-current' />
      break
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={props.isSortable ? style : { cursor: 'default' }}>
      <div
        id={props.todo.id}
        className='flex w-full border border-gray-300 overflow-hidden bg-white rounded-lg shadow-md hover:bg-gray-300'
        onClick={(e) => console.log('Card Clicked')}
      >
        <div className={`flex items-center justify-center w-12 ${statusValues.bgColor}`}>{statusValues.iconDom}</div>

        <div className='px-2 p-1 w-full'>
          <div className='px-1'>
            <div className='flex justify-start items-center'>
              <div className='flex-auto '>
                <span className='text-sm text-gray-700'>{props.todo.title}</span>
                {props.todo.status === 'Done' && (
                  <button
                    type='button'
                    className='text-white bg-red-500  hover:bg-red-700  focus:ring-red-300 font-medium rounded-full text-xs p-1 ms-1 text-center items-center'
                    onClick={(e) => handleRemoveOnClick(e, props.todo.id)}
                  >
                    <span>
                      <IoArchive />
                    </span>
                  </button>
                )}
              </div>
              <span className={`font-semibold text-sm whitespace-pre ${statusValues.textColor}`}>
                {statusValues.state}
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
