import { NextPage } from 'next'
import { FunctionComponent } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

type Props = {
    id?: string
    title?: string
}
const PostLink: FunctionComponent<Props> = (props) => (
    <li>
        {/* <Link href={`/post?title=${props.title}`}> */}
        <Link href="/p/[id]" as={`/p/${props.id}`}>
            <a>{props.id}</a>
        </Link>
    </li>
)

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <Layout>
        <h1>Hello world!</h1>
        <small>user agent {userAgent}</small>
        <hr />
        <ul>
            <PostLink id="hello01"></PostLink>
            <PostLink id="hello-02"></PostLink>
            <PostLink id="hello--03"></PostLink>
        </ul>
    </Layout>
)

Home.getInitialProps = async ({ req }) => {
    const userAgent = req
        ? req.headers['user-agent'] || ''
        : navigator.userAgent
    return { userAgent }
}
export default Home
