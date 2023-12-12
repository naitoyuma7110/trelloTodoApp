import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import Column, { ColumnType } from '../components/DndSample/column'
import { useState } from 'react'
import '../components/DndSample/dnd.module.css'

export default function Dnd() {
  // 仮データを定義
  const data: ColumnType[] = [
    {
      id: 'Column1',
      title: 'Column1',
      cards: [
        {
          id: 'Card1',
          title: 'Card1',
        },
        {
          id: 'Card2',
          title: 'Card2',
        },
      ],
    },
    {
      id: 'Column2',
      title: 'Column2',
      cards: [
        {
          id: 'Card3',
          title: 'Card3',
        },
        {
          id: 'Card4',
          title: 'Card4',
        },
      ],
    },
  ]
  const [columns, setColumns] = useState<ColumnType[]>(data)

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null
    }

    // 各columnのidがuniqueと一致するか走査
    if (columns.some((c) => c.id === unique)) {
      // 一致する場合は一致した要素(1つのカラム)を返す
      return columns.find((c) => c.id === unique) ?? null
    }

    const id = String(unique)
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }))
    })
    // ↑この形で取得する
    // itemWithColumnId = [{ itemId: "Card1", columnId: "Column1" },{...}]

    // item.idがuniqueのidと一致したら、一致したitem.idを持つカラムからカラムid取得
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId
    // 上記のカラムidを走査してそのカラムを返す
    return columns.find((c) => c.id === columnId) ?? null
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards
      const overItems = overColumn.cards
      const activeIndex = activeItems.findIndex((i) => i.id === activeId)
      const overIndex = overItems.findIndex((i) => i.id === overId)
      const newIndex = () => {
        const putOnBelowLastItem = overIndex === overItems.length - 1 && delta.y > 0
        const modifier = putOnBelowLastItem ? 1 : 0
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId)
          return c
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ]
          return c
        } else {
          return c
        }
      })
    })
    console.log('Drag Over over id ' + over?.id)
    console.log('Drag Over active id ' + active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId)
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId)
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex)
            return column
          } else {
            return column
          }
        })
      })
    }
    console.log('Drag End over id ' + over?.id)
    console.log('Drag End active id ' + active.id)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  return (
    // 今回は長くなってしまうためsensors、collisionDetectionなどに関しての説明は省きます。
    // ひとまずは一番使われていそうなものを置いています。
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className='App' style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
        {columns.map((column) => (
          <Column key={column.id} id={column.id} title={column.title} cards={column.cards}></Column>
        ))}
      </div>
    </DndContext>
  )
}
