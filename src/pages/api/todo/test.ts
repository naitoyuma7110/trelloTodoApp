//Route："/api/todo"
// pages/api/todos/index.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { Todo, Status } from '@/features/todo/types'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const todos = await prisma.todo.findMany({
    include: {
      status: true,
    },
  })

  // TODO:idを順番として使用する必要あり
  const convertedTodos: Todo[] = todos.map((todo) => {
    return {
      id: todo.id.toString(),
      title: todo.title,
      content: todo.content,
      status: todo.status.label as Status,
    }
  })

  res.status(200).json(convertedTodos)
}
