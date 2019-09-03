import { NextPage } from 'next'

import Header from '../components/Header'

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <div>
        <Header />
        <h1>Hello world!</h1>
        <small>user agent {userAgent}</small>
    </div>
)

Home.getInitialProps = async ({ req }) => {
    const userAgent = req
        ? req.headers['user-agent'] || ''
        : navigator.userAgent
    return { userAgent }
}
export default Home
