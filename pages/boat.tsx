import gql from "graphql-tag";
import { List, Button } from "antd";
import { NetworkStatus } from "apollo-client";
import { useQuery } from "@apollo/react-hooks";
import copy from "copy-to-clipboard";
import { withApollo } from "../lib/apollo";
import ErrorMessage from "../components/ErrorMessage";
import MainLayout from "../components/MainLayout";

const ALL_DATA = gql`
  {
    clipboard_all {
      str
      remark
      createdAt
      id
      hide
    }
  }
`;

interface ClipItem {
  str: string;
  remark?: string;
  createdAt: Date;
  id: number;
  hide: boolean;
}

const Boat = () => {
  const { loading, error, data, fetchMore, networkStatus, refetch } = useQuery(
    ALL_DATA,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const all: ClipItem[] = data.clipboard_all;

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
        renderItem={(item, idx) => (
          <List.Item
            className="break-all"
            actions={[
              all[idx - 1] && all[idx - 1].str === item.str ? (
                <a>duplicate?</a>
              ) : null,
              <Button
                type="dashed"
                shape="round"
                size="small"
                onClick={() => {
                  copy(item.str);
                }}
              >
                copy
              </Button>
            ]}
          >
            <List.Item.Meta
              title={item.str}
              description={`${item.remark || ""} ${new Date(
                item.createdAt
              ).toLocaleString()}`}
            />
          </List.Item>
        )}
      />
    </MainLayout>
  );
};

export default withApollo(Boat, { ssr: false });
