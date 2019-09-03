import { NextPage } from 'next'
import { FunctionComponent } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'

type Show = {
    id: string
    name: string
}

type Entry = {
    show: Show
}

// type Props = {
//     id?: string
//     title?: string
// }
// const PostLink: FunctionComponent<Props> = (props) => (
//     <li>
//         {/* <Link href={`/post?title=${props.title}`}> */}
//         <Link href="/p/[id]" as={`/p/${props.id}`}>
//             <a>{props.id}</a>
//         </Link>
//     </li>
// )

const Home: NextPage<{ userAgent: string; shows: Show[] }> = ({
    userAgent,
    shows
}) => (
    <Layout>
        <h1>Hello world!</h1>
        <small>user agent {userAgent}</small>
        <hr />
        <ul>
            {shows.map((show) => (
                <li key={show.id}>
                    <Link href="/p/[id]" as={`/p/${show.id}`}>
                        <a>{show.name}</a>
                    </Link>
                </li>
            ))}
            {/* <PostLink id="hello01"></PostLink>
            <PostLink id="hello-02"></PostLink>
            <PostLink id="hello--03"></PostLink> */}
        </ul>
    </Layout>
)

Home.getInitialProps = async ({ req }) => {
    const userAgent = req
        ? req.headers['user-agent'] || ''
        : navigator.userAgent

    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data: Entry[] = await res.json()
    console.log(`Show data fetched. Count: ${data.length}`)

    return { userAgent, shows: data.map((entry) => entry.show) }
}
export default Home
