import React, { useState, useEffect } from 'react'

import { DndContext, useSensor, useSensors, DragEndEvent, closestCorners, MouseSensor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Todo, Status, Statuses } from '@/features/todo/types'
import TodoColmun from '@/features/todo/components/todoColmun'
import TodoForm from '@/features/todo/components/todoForm'
import TodoModal from '@/features/todo/components/todoModal'
import { useSelector, useDispatch } from 'react-redux'
import { setTodos } from '@/features/todo/reducers/todoSlice'
import { RootState } from '@/features/todo/types/index'

const TodoListForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  useEffect(() => {
    setTodoItemList(todos)
  }, [todos])

  const [todoItemList, setTodoItemList] = useState<Todo[]>(todos)

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }))

  const findColumn = (id: string | null) => {
    // この関数を使用するhandlerで取得したidが、カラムのidとドラッグアイテムのidの両方の場合を想定する
    if (!id) {
      return null
    }
    // colmuのidが返ってきた場合はそのまま返す
    if (id == ('Incomplete' || 'Progress' || 'Done')) {
      return id
    }
    // itemのidが渡された場合、そのitemをもつカラムのid(status)を返したい
    return todoItemList.find((todo) => todo.id === id)?.status
  }

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event

    // 位置が変わっていない場合
    if (!over || active.id === over.id) {
      return null
    }
    const overId = String(over.id)
    const overColumn = findColumn(overId)

    // Dragアイテムのidが別のアイテムidもしくはカラムidに対してoverされた場合
    if (active.id !== over.id) {
      const oldIndex = todoItemList.findIndex((v) => v.id === active.id)
      const newIndex = todoItemList.findIndex((v) => v.id === over.id)

      const newTodos = arrayMove(todoItemList, oldIndex, newIndex)
      // active.idからtodoを特定しstatusをcolumnのid(status)に変更する
      const updatedTodoList = newTodos.map((todo) => {
        return todo.id === String(active.id) ? { ...todo, status: (overColumn as Status) || (overId as Status) } : todo
      })
      setTodoItemList(updatedTodoList)
    }

    console.log(overColumn)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }
    // over先todoのidが異なればデータの入れ替えを行う
    if (active.id !== over.id) {
      const oldIndex = todoItemList.findIndex((v) => v.id === active.id)
      const newIndex = todoItemList.findIndex((v) => v.id === over.id)

      const newTodos = arrayMove(todoItemList, oldIndex, newIndex)
      dispatch(setTodos(newTodos))
    }
  }

  const fetchData = fetch('/api/hello')
    .then((response) => response.json())
    .then((res) => {
      return res
    })

  console.log(fetchData)

  return (
    <>
      <div className={`grid grid-cols-${Statuses.length} grid-cols-4`}>
        <div className='mx-2 px-4 py-2 rounded-lg bg-gray-200 '>
          <TodoColmun status={'All'} todoList={todoItemList} />
          <TodoForm />
        </div>
        <DndContext
          id={'unique-dnd-context-id'}
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {Statuses.map((status) => {
            const filteredTodoList = todoItemList.filter((item) => item.status === status)

            return (
              <div key={status} className='mx-2 px-4 py-2 rounded-lg bg-gray-200'>
                <TodoColmun status={status} todoList={filteredTodoList} />
              </div>
            )
          })}
        </DndContext>
      </div>
      <TodoModal />
    </>
  )
}

export default TodoListForm
