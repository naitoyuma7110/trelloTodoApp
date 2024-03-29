import React, { useState, useEffect } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { DndContext, useSensor, useSensors, DragEndEvent, closestCorners, MouseSensor } from '@dnd-kit/core'
import { Todo, Status, Statuses } from '@/features/todo/types'
import TodoColmun from '@/features/todo/components/todoColmun'
import TodoForm from '@/features/todo/components/todoForm'
import TodoModal from '@/features/todo/components/todoModal'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodoAll, setTodos } from '@/features/todo/reducers/todoSlice'
import { RootState } from '@/features/todo/types/index'

const TodoListForm = (): JSX.Element => {
  // dispatchの型の不一致を解決
  // https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete
  const dispatch = useDispatch<any>()

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
    if (over) {
      const overId = String(over.id)
      const activeId = String(active.id)
      const overColumn = findColumn(overId)
      const activeColmun = findColumn(activeId)

      console.log(active)

      console.log(activeColmun)

      // Dragアイテムのidが別のアイテムidもしくはカラムidに対してoverされた場合
      if (active.id !== over.id) {
        const oldIndex = todoItemList.findIndex((v) => v.id === active.id)
        const newIndex = todoItemList.findIndex((v) => v.id === over.id)
        console.log(newIndex)

        // 配列の順序を入れ替える
        const newTodos = arrayMove(todoItemList, oldIndex, newIndex)
        // active.idからtodoを特定しstatusをcolumnのid(status)に変更する
        const updatedTodoList = newTodos.map((todo) => {
          return todo.id === String(active.id)
            ? { ...todo, status: (overColumn as Status) || (overId as Status) }
            : todo
        })
        setTodoItemList(updatedTodoList)
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    dispatch(setTodos(todoItemList))
  }

  // TODO:grid-colsを動的に設定できない
  const gridClass = `grid grid-cols-${Statuses.length ? String(Statuses.length + 1) : '4'}`
  return (
    <>
      <button
        onClick={() => {
          dispatch(fetchTodoAll())
        }}
      >
        ボタン
      </button>
      <div className={gridClass + ' grid grid-cols-4'}>
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
