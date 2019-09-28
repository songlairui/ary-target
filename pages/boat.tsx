import gql from "graphql-tag";
import { List, Row, Col, Affix, Button } from "antd";
import { NetworkStatus } from "apollo-client";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "../lib/apollo";
import ErrorMessage from "../components/ErrorMessage";
import MainLayout from "../components/MainLayout";

const ALL_DATA = gql`
  {
    hi
    all
  }
`;

const Boat = () => {
  const { loading, error, data, fetchMore, networkStatus, refetch } = useQuery(
    ALL_DATA,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const all: string[] = data.all;

  return (
    <MainLayout
      header={
        error ? (
          <ErrorMessage message="Error loading posts." />
        ) : (
          <Button
            loading={loading && !loadingMore}
            type="primary"
            onClick={() => refetch()}
          >
            Refetch
          </Button>
        )
      }
    >
      <List
        style={{ width: "100%" }}
        bordered
        dataSource={all}
        renderItem={item => <List.Item className="break-all">{item}</List.Item>}
      />
    </MainLayout>
  );
};

export default withApollo(Boat, { ssr: false });
