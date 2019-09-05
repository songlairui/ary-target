import Link from "next/link";
import { Layout, Card, Button } from "antd";

const { Header, Sider, Content, Footer } = Layout;

const MenuItems = [["/self-speak", "Self Speak"], ["/boat", "Boat"]];

export default () => (
  <Layout style={{ height: "100%" }}>
    <Header style={{ height: "20vh", background: "#fff", padding: 0 }}></Header>
    <Layout>
      <Sider theme="light"></Sider>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        {MenuItems.map((item, idx) => (
          <Card
            key={idx}
            style={{ width: 300, margin: "5px" }}
            bordered={false}
          >
            <Link href={item[0]}>
              <Button type="link" block>
                {item[1] || item[0]}
              </Button>
            </Link>
          </Card>
        ))}
      </Content>
      <Sider theme="light"></Sider>
    </Layout>
    <Footer style={{ textAlign: "center", backgroundColor: "#fff" }}>
      {/* ©2019 Songlairui */}
      {process.env.L}
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
