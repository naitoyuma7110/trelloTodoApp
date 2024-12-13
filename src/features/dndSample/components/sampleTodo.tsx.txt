import React, { useState } from 'react'

import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Todo } from '../../../components/Todo/todoItem'

type SampleProps = {
  todo: Todo
}

const SampleTodo = (props: SampleProps) => {
  return (
    <div className='border border-blue-100'>
      <div>{props.todo.title}</div>
      <div> {props.todo.content}</div>
    </div>
  )
}

export default SampleTodo
