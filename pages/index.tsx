import Link from "next/link";
import { Card, Button, Tag, Input } from "antd";
import MainLayout from "../components/MainLayout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/apollo";
import { useState, useRef } from "react";
import {
  login,
  CURRENT_USERNAME,
  LAST_USERNAME,
  logout
} from "../lib/api/auth";
import { NextPage } from "next";
import { getCookie } from "../lib/session";

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

const Home: NextPage<{ rawCookie: string }> = function({ rawCookie }) {
  const { loading, error, data, refetch } = useQuery(ALL_FIRST);
  const { api_first: menuItems = [] }: { api_first: FirstItem[] } = data || {};
  const [currentUsername, setCurUsername] = useState(
    getCookie(CURRENT_USERNAME, rawCookie)
  );
  const [username, setUsername] = useState(
    getCookie(LAST_USERNAME, rawCookie) || ""
  );
  const [password, setPassword] = useState("");
  const [logining, setLogining] = useState(false);
  const passwdEl = useRef<Input>(null);

  const rereadCurrent = () =>
    setCurUsername(getCookie(CURRENT_USERNAME, rawCookie));

  return (
    <MainLayout
      header={<Tag color="geekblue">~~</Tag>}
      subFooter={
        currentUsername ? (
          <Button
            style={{ float: "right" }}
            onClick={() => {
              logout();
              rereadCurrent();
            }}
          >
            {currentUsername} x
          </Button>
        ) : (
          <Input.Group compact>
            <Input
              style={{ width: "50%", maxWidth: "10em" }}
              defaultValue=""
              onChange={e => setUsername(e.target.value)}
              onPressEnter={() => {
                const { current } = passwdEl;
                current && current.focus();
              }}
            />
            <Input
              ref={passwdEl}
              style={{ width: "50%", maxWidth: "10em" }}
              defaultValue=""
              type="password"
              onChange={e => setPassword(e.target.value)}
              onPressEnter={async e => {
                setLogining(true);
                try {
                  await login(username, password);
                  rereadCurrent();
                } catch (error) {
                  //
                }
                setLogining(false);
              }}
            />
          </Input.Group>
        )
      }
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
