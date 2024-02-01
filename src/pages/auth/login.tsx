import { getProviders, signIn } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import { FaGithubAlt } from 'react-icons/fa'

// getServerSidePropsで取得した値を使用するコンポーネントはSSRによりサーバーサイドで動的に生成される
const login = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // authHandlerに渡したoption.providersを使用する
  console.log(providers)
  return (
    <div className='flex flex-col items-center space-y-20 pt-40'>
      <FaGithubAlt className='w-24 h-24' />
      <div className='text-center '>
        <div className='mx-auto max-w-3xl'>
          <div className='flexjustify-center'>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <div key={provider.name}>
                    <button
                      className='group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white'
                      onClick={() =>
                        // signIn()で"api/auth/{provider}"へ、どのProviderを使用するかid("github","google"など)を指定しリクエスト
                        // https://next-auth.js.org/configuration/pages
                        signIn(provider.id, {
                          // 認証後の遷移先
                          callbackUrl: '/',
                        })
                      }
                    >
                      <span className='absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-slate-800 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0'></span>
                      <span className='relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white'>
                        Sign in with {provider.name}
                      </span>
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
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
