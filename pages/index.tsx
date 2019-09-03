import { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <header>
        <h1>Hello world!</h1>
        <small>user agent {userAgent}</small>
        <nav>
            <Link href="/about">
                <a title="about page">About Page</a>
            </Link>
        </nav>
    </header>
)

Home.getInitialProps = async ({ req }) => {
    const userAgent = req
        ? req.headers['user-agent'] || ''
        : navigator.userAgent
    return { userAgent }
}
export default Home
