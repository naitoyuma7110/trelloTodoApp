import Header from '@/components/Header'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // auth/[...nextauth]で設定したoption、adapter: PrismaAdapter(prisma)の部分でセッション情報がDBで永続化されている。
    // SessionProviderはprismaを介してDBのセッション情報を取得しコンポーネントに渡す事でネストされたコンポーネントで認証情報を参照できる
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />;
    </SessionProvider>
  )
}
