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
      <div ref={setNodeRef}>
        {props.todoList.map((todo, i) => (
          <TodoItem key={todo.id} todo={todo} isSortable />
        ))}
      </div>
    </SortableContext>
  )
}

export default TodoColmun
