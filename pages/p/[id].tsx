import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch'
import { NextPage } from 'next'

type Image = {
    medium: string
}
type Show = {
    name: string
    summary: string
    image: Image
}
type Props = {
    show: Show
}
const Post: NextPage<Props> = (props) => (
    <Layout>
        <h1>{props.show.name}</h1>
        <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={props.show.image.medium} />
    </Layout>
)

Post.getInitialProps = async function(context) {
    const { id } = context.query
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const show = await res.json()
    console.log(`Fetched show: ${show.name}`)
    return { show }
}

export default Post
