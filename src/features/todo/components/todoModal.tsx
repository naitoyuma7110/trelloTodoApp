import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Select,
  Option,
} from '@material-tailwind/react'

import { useSelector, useDispatch } from 'react-redux'
import { updateTodo } from '@/features/todo/reducers/todoSlice'
import { closeModal } from '../reducers/modalSlice'
import { RootState, Status, StatusValues, Statuses, Todo } from '@/features/todo/types'
import { FaCheckCircle } from 'react-icons/fa'
import { TbProgress } from 'react-icons/tb'
import { RiZzzFill } from 'react-icons/ri'

const TodoModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.modals.editModalIsOpen)
  const editTodo = useSelector((state: RootState) => state.modals.todo)

  const [todo, setTodo] = useState<Todo>(editTodo)

  useEffect(() => {
    setTodo(editTodo)
  }, [editTodo])

  // TODO:useRefを使用しないとuseEffectで依存性Warningが発生する理由を調べる
  const optionStatusesRef = useRef<StatusValues[]>([
    {
      status: 'Done',
      color: 'green',
      iconDom: <FaCheckCircle className='w-6 h-6 text-white fill-current' />,
    },
    {
      status: 'Progress',
      color: 'blue',
      iconDom: <TbProgress className='w-6 h-6 text-white fill-current' />,
    },
    {
      status: 'Incomplete',
      color: 'gray',
      iconDom: <RiZzzFill className='w-6 h-6 text-white fill-current' />,
    },
  ])

  const [optionStatus, setOptionStatus] = useState<StatusValues>()

  useEffect(() => {
    const setOptionStatuses = optionStatusesRef.current.find((status) => status.status === todo.status)
    setOptionStatuses && setOptionStatus(setOptionStatuses)
  }, [todo])

  const handleCloseModalOnClick = (
    event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>,
    isUpdate?: boolean,
  ) => {
    if (isUpdate) {
      dispatch(updateTodo(todo))
    }
    dispatch(closeModal())
  }

  const handlerTodoTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = { ...todo }
    newTodo.title = event.target.value
    setTodo(newTodo)
  }

  const handlerTodoContentsOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTodo = { ...todo }
    newTodo.content = event.target.value
    setTodo(newTodo)
  }

  const handlerTodoStatusOnChange = (status: Status) => {
    const newTodo = { ...todo }
    newTodo.status = status
    setTodo(newTodo)
  }

  return (
    <>
      <Dialog className='p-5' open={isOpen} size='xs' handler={handleCloseModalOnClick}>
        <DialogHeader className='text-gray-600'>編集</DialogHeader>
        <DialogBody>
          <div className='flex flex-col gap-8'>
            <Input
              crossOrigin=''
              value={todo.title}
              onChange={(e) => handlerTodoTitleOnChange(e)}
              variant='static'
              label='タイトル'
              placeholder='Title'
            />
            <div className='w-1/2'>
              <Select
                size='lg'
                label='状態'
                defaultValue={todo.status}
                value={todo.status}
                onChange={(status) => handlerTodoStatusOnChange(status as Status)}
                selected={() => (
                  <div className='flex items-center'>
                    <span className={`p-1 me-2 border rounded bg-${optionStatus?.color}-500`}>
                      {optionStatus?.iconDom}
                    </span>
                    <span>{optionStatus?.status}</span>
                  </div>
                )}
              >
                {optionStatusesRef.current.map((status) => {
                  return (
                    <Option key={status.status} value={status.status}>
                      <div className='flex items-center'>
                        <span className={`p-1 me-2 border rounded bg-${status.color}-500`}>{status.iconDom}</span>
                        <span>{status.status}</span>
                      </div>
                    </Option>
                  )
                })}
              </Select>
            </div>
            <Textarea
              value={todo.content}
              onChange={(e) => handlerTodoContentsOnChange(e)}
              variant='static'
              label='内容'
              placeholder='内容'
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant='text' color='gray' onClick={handleCloseModalOnClick} className='mr-1'>
            <span>キャンセル</span>
          </Button>
          <Button variant='gradient' color='green' onClick={(e) => handleCloseModalOnClick(e, true)}>
            <span>保存</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default TodoModal
