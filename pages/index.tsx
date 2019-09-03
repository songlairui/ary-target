import { NextPage } from 'next'

import Header from '../components/Header'
import Layout from '../components/Layout'

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <Layout>
        <h1>Hello world!</h1>
        <small>user agent {userAgent}</small>
    </Layout>
)

Home.getInitialProps = async ({ req }) => {
    const userAgent = req
        ? req.headers['user-agent'] || ''
        : navigator.userAgent
    return { userAgent }
}
export default Home
