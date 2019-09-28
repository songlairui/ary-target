import { List, Tag, Button } from "antd";
import MainLayout from "../components/MainLayout";
import Router from "next/router";

const data: string[] = [
  "其实，我想要我做的事情有进度感",
  "Actually, I have a sense of advancement"
];

export default () => (
  <MainLayout>
    <List
      bordered
      dataSource={data}
      renderItem={(item: string) => <List.Item>{item}</List.Item>}
    />
  </MainLayout>
);
