import Link from 'next/link'
import WP from 'wpapi'

const wpClient = new WP({
    endpoint: 'http://3.112.71.42/wp-json'
})

export const getStaticPaths = async () => {
    const posts = await wpClient.posts()
    return {
        paths: posts.map(post => ({
            params: {
                slug: post.slug
            }
        })),
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const posts = await wpClient.posts().slug(params.slug as string);
    return {
        props: {
            post: posts[0]
        }
    }
}

export default ({ post }) => {
    return (
        <div>
            <h1>Hello</h1>
            <h2>{post.title.rendered}</h2>
            {decodeURI(post.slug)}
            <div
                dangerouslySetInnerHTML={{
                    __html: post.content.rendered
                }}></div>
            <Link href="/">Back</Link>
        </div>
    )
}