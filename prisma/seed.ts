// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // Todoテーブルの全レコードを削除
  await prisma.todo.deleteMany()

  // Statusテーブルの全レコードを削除
  await prisma.status.deleteMany()

  // サンプルStatusデータの追加
  const status1 = await prisma.status.create({
    data: {
      label: 'Incomplete',
      userId: process.env.SEEDER_USER_ID!,
    },
  })

  const status2 = await prisma.status.create({
    data: {
      label: 'Progress',
      userId: process.env.SEEDER_USER_ID!,
    },
  })

  const status3 = await prisma.status.create({
    data: {
      label: 'Done',
      userId: process.env.SEEDER_USER_ID!,
    },
  })

  // サンプルTodoデータの追加
  // userIdに対応するuserは既に作成済とする
  const todo1 = await prisma.todo.create({
    data: {
      title: 'Task 1',
      content: 'Incomplete something important',
      statusId: status1.id,
      userId: process.env.SEEDER_USER_ID!,
    },
  })

  const todo2 = await prisma.todo.create({
    data: {
      title: 'Task 2',
      content: 'Progress the project',
      statusId: status2.id,
      userId: process.env.SEEDER_USER_ID!,
    },
  })

  const todo3 = await prisma.todo.create({
    data: {
      title: 'Task 3',
      content: 'Done the project',
      statusId: status3.id,
      userId: process.env.SEEDER_USER_ID!,
    },
  })

  console.log('Seed data added successfully')
}

seed()
  .catch((error) => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
