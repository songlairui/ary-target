import Link from "next/link";
import { Card, Button, Tag } from "antd";
import MainLayout from "../components/MainLayout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/apollo";

const MenuItems = [
  ["/zero", "Zero"],
  ["/self-speak", "Self Speak"],
  ["/boat", "Boat"]
];
const b = <Tag color="geekblue">~~</Tag>;

type FirstItem = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  hidden: boolean;
  createdAt: Date;
  links: string;
};

const ALL_FIRST = gql`
  {
    api_first {
      id
      icon
      title
      desc
      hidden
      createdAt
      links
    }
  }
`;

const Home = function() {
  const { loading, error, data, refetch } = useQuery(ALL_FIRST);
  const { api_first: menuItems = [] }: { api_first: FirstItem[] } = data || {};

  return (
    <MainLayout
      header={<Tag color="geekblue">~~</Tag>}
      style={{ flexDirection: "row" }}
    >
      {menuItems.map((item, idx) => (
        <Card
          key={idx}
          style={{ maxWidth: 300, margin: "5px" }}
          bordered={false}
        >
          <Link href={item.links || "/"}>
            <Button type="link" block>
              {item.title}
            </Button>
          </Link>
        </Card>
      ))}
    </MainLayout>
  );
};

export default withApollo(Home);
