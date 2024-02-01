import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import prisma from '../../../lib/prisma'

// [...props]：複数のParamsを受け取るルート設定(./api/auth/{param1}/{param2})
// req.query.propsの形で[param1, param2]を取得できる
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

// githubの認可サーバへのアクセス設定とparamsを渡しhandlerを作成する
export default authHandler

const options = {
  // providersは現状Githubのみ設定
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  pages: {
    signIn: '/auth/login',
  },
}
