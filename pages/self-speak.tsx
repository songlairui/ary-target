import { Layout, List, Row, Col } from "antd";

const { Header, Sider, Content } = Layout;
const data = [
  "其实，我想要我做的事情有进度感",
  "Actually, I have a sense of advancement"
];

export default () => (
  <Layout style={{ height: "100%" }}>
    <Header style={{ height: "20vh", background: "#fff", padding: 0 }}></Header>
    <Layout>
      <Sider theme="light"></Sider>
      <Content
        style={{
          overflow: "initial",
          backgroundColor: "#fff"
        }}
      >
        <Row type="flex" justify="space-around">
          <Col style={{ maxWidth: "43em", minWidth: "13em" }}>
            <List
              bordered
              dataSource={data}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Col>
        </Row>
      </Content>
      <Sider theme="light"></Sider>
    </Layout>
  </Layout>
);
