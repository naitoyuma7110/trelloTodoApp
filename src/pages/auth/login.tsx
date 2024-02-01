import { getProviders, signIn } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import { FaGithubAlt } from 'react-icons/fa'
import { Button, Typography } from '@material-tailwind/react'

// getServerSidePropsで取得した値を使用するコンポーネントはSSRによりサーバーサイドで動的に生成される
const login = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // authHandlerに渡したoption.providersを使用する
  console.log(providers)
  return (
    <div className='flex flex-col items-center space-y-20 pt-40'>
      {providers &&
        Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <Button
                className='bg-black flex items-center gap-2'
                onClick={() =>
                  // signIn()で"api/auth/{provider}"へ、どのProviderを使用するかid("github","google"など)を指定しリクエスト
                  // https://next-auth.js.org/configuration/pages
                  signIn(provider.id, {
                    // 認証サーバへのリクエスト後の遷移先
                    callbackUrl: '/',
                  })
                }
              >
                <FaGithubAlt className='w-10 h-10 text-white' />
                <Typography>Login with Github</Typography>
              </Button>
            </div>
          )
        })}
    </div>
  )
}

export default login

export const getServerSideProps = async () => {
  // authHandlerに渡したoption.providersを取得する
  const providers = await getProviders()

  return {
    props: { providers },
  }
}
