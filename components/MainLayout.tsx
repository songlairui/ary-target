import { FunctionComponent, CSSProperties } from "react";
import { Layout, Button } from "antd";
import Router from "next/router";

const { Header, Content, Footer } = Layout;

type Props = {
  title?: string;
  header?: JSX.Element;
  style?: CSSProperties;
};

const MainLayout: FunctionComponent<Props> = props => (
  <Layout style={{ height: "100%" }}>
    <Header
      style={{
        height: "8vh",
        background: "#fff",
        padding: 0,
        textAlign: "center"
      }}
    >
      {props.header ? (
        props.header
      ) : (
        <Button type="link" color="geekblue" onClick={() => Router.back()}>
          Home
        </Button>
      )}
    </Header>
    <Layout style={{ maxWidth: "90vw", margin: "0 auto" }}>
      <Content
        style={{
          margin: "24px 16px",
          overflow: "auto",
          flexWrap: "wrap",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minWidth: 360,
          ...props.style
        }}
      >
        {props.children}
      </Content>
    </Layout>
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#fff",
        color: "gray"
      }}
    >
      <Button type="link" color="geekblue" onClick={() => Router.back()}>
        Home
      </Button>{" "}
      ©2019 Songlairui
    </Footer>
  </Layout>
);

export default MainLayout;

export const withMainLayout = (
  Page: FunctionComponent,
  Header: JSX.Element
) => () => (
  <MainLayout header={Header}>
    <Page />
  </MainLayout>
);
