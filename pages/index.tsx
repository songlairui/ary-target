import Link from "next/link";
import { Layout, Card, Button } from "antd";

const { Header, Sider, Content, Footer } = Layout;

export default () => (
  <Layout style={{ height: "100%" }}>
    <Header style={{ height: "20vh", background: "#fff", padding: 0 }}></Header>
    <Layout>
      <Sider theme="light"></Sider>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <Card style={{ width: 300 }} bordered={false}>
          <Link href="/self-speak">
            <Button type="link" block>
              Self Speak
            </Button>
          </Link>
        </Card>
      </Content>
      <Sider theme="light"></Sider>
    </Layout>
    <Footer style={{ textAlign: "center", backgroundColor: "#fff" }}>
      {/* ©2019 Songlairui */}
      {""}
    </Footer>
    <style jsx global>
      {`
        #__next {
          height: 100%;
        }
      `}
    </style>
  </Layout>
);
