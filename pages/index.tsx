import Link from "next/link";
import { Card, Button, Tag } from "antd";
import MainLayout from "../components/MainLayout";

const MenuItems = [
  ["/zero", "Zero"],
  ["/self-speak", "Self Speak"],
  ["/boat", "Boat"]
];
const b = <Tag color="geekblue">~~</Tag>;

export default () => (
  <MainLayout header={<Tag color="geekblue">~~</Tag>}>
    {MenuItems.map((item, idx) => (
      <Card key={idx} style={{ maxWidth: 300, margin: "5px" }} bordered={false}>
        <Link href={item[0]}>
          <Button type="link" block>
            {item[1] || item[0]}
          </Button>
        </Link>
      </Card>
    ))}
  </MainLayout>
);
