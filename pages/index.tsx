import Link from "next/link";
import { Card, Button, Tag, Input, Col, Row, Popover, Switch } from "antd";
import MainLayout from "../components/MainLayout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/apollo";
import { useState, useRef } from "react";
import { CURRENT_USERNAME, LAST_USERNAME } from "../lib/api/common";
import { login, logout, whoami } from "../lib/api/auth";
import { NextPage } from "next";
import { getCookie } from "../lib/session";
import { createFirstItem, FirstItemDto } from "../lib/api/first";

const MenuItems = [
  ["/zero", "Zero"],
  ["/self-speak", "Self Speak"],
  ["/boat", "Boat"]
];

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

interface Dict {
  [key: string]: any;
}

const AddFirstItem = function({ onSubmit }: { onSubmit?: Function }) {
  const items = [["title"], ["desc"], ["links"]];
  const states = items.map(item => {
    const [val, setVal] = useState("");
    return { key: item[0], val, setVal };
  });

  const [hidden, setHidden] = useState(false);
  const submit = function() {
    const payload = states.reduce(
      (result, { key, val }) => {
        result[key] = val;
        return result;
      },
      { hidden } as Dict
    );
    onSubmit && onSubmit(payload);
  };
  return (
    <Row>
      <Col>
        {states.map(({ key, val, setVal }) => (
          <Input
            key={key}
            onChange={e => setVal(e.target.value)}
            value={val}
            placeholder={key}
          />
        ))}

        <Switch
          defaultChecked={!hidden}
          onChange={e => {
            setHidden(!e);
          }}
        />
        <Button onClick={submit}>Submit</Button>
      </Col>
    </Row>
  );
};

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
          <Row style={{ float: "right" }}>
            <Col>
              <Popover
                placement="topRight"
                content={
                  <AddFirstItem
                    onSubmit={(payload: FirstItemDto) => {
                      createFirstItem(payload);
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
