import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navbar, Typography, Button, List, ListItem } from '@material-tailwind/react'
import { IoIosLogIn } from 'react-icons/io'
import { CgLogOut } from 'react-icons/cg'
import { signIn, signOut, useSession } from 'next-auth/react'

function NavList() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 認証ページであるかを判定し認証ページにはログイン画面への遷移ボタンを表示しない
  const isAuthPage = router.pathname.startsWith('/auth/')
  return (
    <List className='p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1'>
      <Button className='flex items-center gap-2 bg-white mx-2 border border-gray-400' variant='outlined'>
        <Typography className='text-sm text-center'>
          <Link href='/'>HOME</Link>
        </Typography>
      </Button>
      {status !== 'loading' && !isAuthPage && !session && (
        <Button className='flex items-center gap-2 mx-2' color='blue' onClick={() => signIn()}>
          <IoIosLogIn className='w-6 h-6' />
          <Typography className='text-sm text-center'>LogIn</Typography>
        </Button>
      )}
      {status !== 'loading' && session && (
        <Button className='flex items-center gap-2 bg-gray-600 mx-2' onClick={() => signOut()}>
          <CgLogOut className='w-6 h-6'></CgLogOut>
          <Typography className='text-sm'>Logout</Typography>
        </Button>
      )}
    </List>
  )
}

// SessionProviderでネストされた要素ではnext-authが提供するuseSession()によりサーバ側で渡されたセッショントークンを取得する事が可能
const Header = () => {
  return (
    <>
      <Navbar className='max-w-full px-4 py-2 lg:px-8 lg:py-4'>
        <div className='flex items-center justify-between'>
          <Typography as='a' href='/' variant='h4' className='mr-4 cursor-pointer py-1.5 lg:ml-2 text-blue-gray-800'>
            TODO APP
          </Typography>
          <div className='hidden lg:block'>
            <NavList />
          </div>
        </div>
      </Navbar>
    </>
  )
}

export default Header
