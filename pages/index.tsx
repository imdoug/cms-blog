import type { NextPage } from 'next'
import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components'

const posts = [
  {title: 'React test', exerpt: 'Learn React testing '},
  {title: 'React with Tailwind', exerpt: 'Learn React with Tailwind testing '}
]

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post) =>(
            <PostCard post={post} key={post.title}/>
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
            <div className='ls:sticky relative top-8'>
              <PostWidget />
              <Categories />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
