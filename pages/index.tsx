import { NextPage } from 'next'
import { FunctionComponent } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

type Props = {
    title?: string
}
const PostLink: FunctionComponent<Props> = (props) => (
    <li>
        <Link href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
)

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <Layout>
        <h1>Hello world!</h1>
        <small>user agent {userAgent}</small>
        <hr />
        <ul>
            <PostLink title="hello01"></PostLink>
            <PostLink title="hello02"></PostLink>
            <PostLink title="hello03"></PostLink>
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
