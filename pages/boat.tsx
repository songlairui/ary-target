import gql from "graphql-tag";
import { Layout, List, Row, Col } from "antd";
import { NetworkStatus } from "apollo-client";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "../lib/apollo";
import ErrorMessage from "../components/ErrorMessage";

const { Header, Sider, Content } = Layout;

const ALL_DATA = gql`
  {
    hi
    all
  }
`;

const Boat = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_DATA,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading && !loadingMore) return <div>Loading</div>;

  const { hi } = data;
  const all: string[] = data.all;

  return (
    <Layout style={{ height: "100%" }}>
      <Header
        style={{ height: "20vh", background: "#fff", padding: 0 }}
      ></Header>
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
                dataSource={all}
                renderItem={item => (
                  <List.Item className="break-all">{item}</List.Item>
                )}
              />
            </Col>
          </Row>
        </Content>
        <Sider theme="light"></Sider>
      </Layout>
    </Layout>
  );
};

export default withApollo(Boat, { ssr: false });
