import fetch from 'isomorphic-unfetch'
import { NextPage } from 'next'
import Markdown from 'react-markdown'
import Layout from '../../components/Layout'

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
        <div className="markdown">
            <Markdown
                source={`markdown
### Title`}
            />
        </div>
        <style jsx global>
            {`
                .markdown {
                    font-family: 'Arial';
                    border: thin solid lightgray;
                    margin: 0.5em;
                    padding: 0.5em;
                }
                .markdown a {
                    text-decoration: none;
                    color: blue;
                }
                .markdown h3 {
                    margin: 0;
                    padding: 0;
                    text-transform: uppercase;
                }
            `}
        </style>
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
