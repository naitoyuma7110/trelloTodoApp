import { FC } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { FaCheckCircle } from 'react-icons/fa'
import { TbProgress } from 'react-icons/tb'
import { RiZzzFill } from 'react-icons/ri'
import { Todo } from '@/features/todo/types'

type TodoItemProps = {
  todo: Todo
  isSortable?: boolean
}

const TodoItem = (props: TodoItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.todo.id,
  })

  // 状態に応じて各クラス名、テキスト、アイコンを取得する
  let statusValues = {
    text: '',
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
      statusValues.text = '完了'
      statusValues.textColor = 'text-emerald-500'
      statusValues.bgColor = 'bg-emerald-500'
      statusValues.iconDom = <FaCheckCircle className='w-6 h-6 text-white fill-current' />
      break
    case 'Progress':
      statusValues.text = '対応中'
      statusValues.textColor = 'text-blue-600'
      statusValues.bgColor = 'bg-blue-600'
      statusValues.iconDom = <TbProgress className='w-6 h-6 text-white fill-current' />
      break
    case 'Incomplete':
      statusValues.text = '未対応'
      statusValues.textColor = 'text-gray-500'
      statusValues.bgColor = 'bg-gray-600'
      statusValues.iconDom = <RiZzzFill className='w-6 h-6 text-white fill-current' />
      break
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={props.isSortable ? style : { cursor: 'default' }}>
      <div
        id={props.todo.id}
        className='flex w-full border border-gray-300 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'
      >
        <div className={`flex items-center justify-center w-12 ${statusValues.bgColor}`}>{statusValues.iconDom}</div>

        <div className='px-2 p-1 w-full'>
          <div className='px-1'>
            <div className='flex justify-start'>
              <span className='flex-auto text-sm text-gray-700'>{props.todo.title}</span>
              <span className={`font-semibold text-sm  ${statusValues.textColor}`}>{statusValues.text}</span>
            </div>
            <span className='text-xs  text-gray-600 dark:text-gray-200'>{props.todo.content}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoItem
