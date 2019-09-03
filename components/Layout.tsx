import { FunctionComponent } from 'react'
import Header from './Header'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

type Props = {
    title?: string
}

const Layout: FunctionComponent<Props> = (props) => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
)

export default Layout

export const withLayout = (Page: FunctionComponent) => () => (
    <div style={layoutStyle}>
        <Header />
        <Page />
    </div>
)
