import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Todo, Status } from '@/features/todo/types'
import TodoItem from '@/features/todo/components/todoItem'

type TodoColmunProps = {
  todoList: Todo[]
  status: Status | 'All'
}

const TodoColmun = (props: TodoColmunProps) => {
  const { setNodeRef } = useDroppable({ id: props.status })

  return (
    <SortableContext id={props.status} items={props.todoList} strategy={rectSortingStrategy}>
      {/* paddingを付けて範囲を確保しないとDragイベント時にColumnIdが返らない */}
      <div ref={setNodeRef} className='border bg-gray-100 rounded-lg'>
        {props.todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} isSortable />
        ))}
      </div>
    </SortableContext>
  )
}

export default TodoColmun
