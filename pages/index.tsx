import Link from "next/link";
import { Card, Button, Tag, Input, Col, Row, Popover } from "antd";
import MainLayout from "../components/MainLayout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/apollo";
import { useState, useRef } from "react";
import { CURRENT_USERNAME, LAST_USERNAME } from "../lib/api/common";
import { login, logout, whoami } from "../lib/api/auth";
import { NextPage } from "next";
import { getCookie } from "../lib/session";
import { createFirstItem } from "../lib/api/first";
import AddFirstItem from "../components/home/AddFirstItem";
import { FirstItem, FirstItemDto } from "../interfaces/home.interface";

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
      itemType
    }
  }
`;

const Home: NextPage<{ rawCookie: string }> = function({ rawCookie }) {
  const { loading, error, data, refetch, updateQuery } = useQuery(ALL_FIRST);
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
  const [pop, togglePop] = useState(false);

  const rereadCurrent = () =>
    setCurUsername(getCookie(CURRENT_USERNAME, rawCookie));

  return (
    <MainLayout
      header={<Tag color="geekblue">~~</Tag>}
      subFooter={
        currentUsername ? (
          <Row style={{ float: "right" }}>
            <Col>
              <Popover
                placement="topRight"
                visible={pop}
                onVisibleChange={togglePop}
                content={
                  <AddFirstItem
                    onSubmit={async (payload: FirstItemDto) => {
                      const result = await createFirstItem(payload);
                      togglePop(false);
                      updateQuery(({ api_first }) => {
                        api_first.push({ ...result, __typename: "First" });
                        return { api_first };
                      });
                    }}
                  />
                }
                trigger="click"
              >
                <Button size="small" shape="circle" icon="plus" />
              </Popover>
            </Col>
            <Col>
              <Tag
                closable={true}
                onClick={async () => {
                  console.info(await whoami());
                }}
                onClose={() => {
                  logout();
                  rereadCurrent();
                }}
                color="magenta"
              >
                {currentUsername}
              </Tag>
            </Col>
          </Row>
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
