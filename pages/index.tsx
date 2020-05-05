import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
// WordPress REST API client
import WP from 'wpapi'

const wpClient = new WP({
  endpoint: 'http://3.112.71.42/wp-json'
})

// Next.js チュートリアル
// export default function Home({
//     allPostsData
//   }: {
//     allPostsData: {
//       date: string
//       title: string
//       id: string
//     }[]
//   }) {
//   return (
//     <Layout home>
//       <Head>
//       <title>{siteTitle}</title>
//       </Head>
//       <section className={utilStyles.headingMd}>
//         <p>[Your Self Introduction]</p>
//         <p>
//           (This is a sample website - you’ll be building a site like this in{' '}
//           <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
//         </p>
//       </section>
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//               <Link href="/posts/[id]" as={`/posts/${id}`}>
//                 <a>{title}</a>
//               </Link>
//               <br />
//               <small className={utilStyles.lightText}>
//                 <Date dateString={date} />
//               </small>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </Layout>
//   )
// }

/* Next.js チュートリアル
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
*/

const Home = (props) => {
  return (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <ul>
        {props.posts.map(post => (
          <li key={post.id}>
             <Link href={encodeURI(post.slug)}>
              {decodeURI(post.slug)}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </div>
  )
}
export default Home


export const getStaticProps: GetStaticProps = async () => {
  const data = await wpClient.posts()
  return {
    props: {
      posts: data
    }
  }
}
