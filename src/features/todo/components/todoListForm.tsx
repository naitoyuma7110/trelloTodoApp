import React, { useState, useEffect } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCorners,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Todo, Status } from '@/features/todo/types'
import TodoColmun from '@/features/todo/components/todoColmun'
import TodoForm from '@/features/todo/components/todoForm'
import TodoModal from '@/features/todo/components/todoModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/features/todo/types/index'

const TodoListForm = (): JSX.Element => {
  const todos = useSelector((state: RootState) => state.todos.todos)
  useEffect(() => {
    setTodoItemList(todos)
  }, [todos])

  const [todoItemList, setTodoItemList] = useState<Todo[]>(todos)

  const [statuses, setStatuses] = useState<Status[]>(['Incomplete', 'Progress', 'Done'])

  const [isModalOpen, setIsModalopen] = useState(true)

  const handleOpenModal = () => {
    setIsModalopen(true)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  /* 
  const handleAddTodoOnClick = (todo: Todo) => {
    const newTodoList = [...todoItemList]

    todo.id = (newTodoList.length + 1).toString()
    newTodoList.push(todo)
    setTodoItemList(newTodoList)
    console.log('追加')
  }
  */

  const findColumn = (id: string | null) => {
    // この関数を使用するhandlerで取得したidが、カラムのidとドラッグアイテムのidである場合の両方を想定する
    if (!id) {
      return null
    }
    // colmuのidが返ってきた場合はそのまま返す
    if (id === ('Incomplete' || 'Progress' || 'Done')) {
      return id
    }
    // itemのidが渡された場合、itemもつカラムのidを返したい
    return todoItemList.find((todo) => todo.id === id)?.status
  }

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event

    console.log('over')

    if (!over || active.id === over.id) {
      return
    }

    const overId = String(over.id)
    const overColumn = findColumn(overId)

    if (active.id !== over.id) {
      // active.idからtodoを特定しstatusをcolumnのid(status)に変更する
      const updatedTodoList = todoItemList.map((todo) => {
        return todo.id === String(active.id) ? { ...todo, status: (overColumn as Status) || (overId as Status) } : todo
      })
      setTodoItemList(updatedTodoList)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    console.log('end')

    if (!over || active.id === over.id) {
      return
    }

    const overId = String(over.id)
    const overColumn = findColumn(overId)

    // over先todoのidが異なればデータの入れ替えを行う
    if (active.id !== over.id) {
      const oldIndex = todoItemList.findIndex((v) => v.id === active.id)
      const newIndex = todoItemList.findIndex((v) => v.id === over.id)
      setTodoItemList(arrayMove(todoItemList, oldIndex, newIndex))
    }
  }

  return (
    <>
      <div className={`grid grid-cols-${statuses.length} grid-cols-4`}>
        <div className='mx-2 px-4 py-2 rounded-lg bg-gray-200 '>
          <span className='inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white'>
            All
          </span>
          <TodoColmun status={'All'} todoList={todoItemList} />
          <TodoForm />
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {statuses.map((status) => {
            const filteredTodoList = todoItemList.filter((item) => item.status === status)

            return (
              <div key={status} className='mx-2 px-4 py-2 rounded-lg bg-gray-200'>
                <span className='inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white'>
                  {status}
                </span>
                <TodoColmun key={status} status={status} todoList={filteredTodoList} />
              </div>
            )
          })}
        </DndContext>
      </div>
      <TodoModal isOpen={isModalOpen} />
    </>
  )
}

export default TodoListForm
