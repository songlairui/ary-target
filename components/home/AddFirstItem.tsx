import { Button, Input, Col, Row, Switch, Radio } from "antd";
import { useState } from "react";
import { Dict, ItemType } from "../../interfaces/home.interface";

const AddFirstItem = function({ onSubmit }: { onSubmit?: Function }) {
  const items = [["title"], ["desc"], ["links"]];
  const states = items.map(item => {
    const [val, setVal] = useState("");
    return { key: item[0], val, setVal };
  });

  const [hidden, setHidden] = useState(false);
  const [itemType, setItemType] = useState("SUBPAGE");
  const submit = function() {
    const payload = states.reduce(
      (result, { key, val }) => {
        result[key] = val;
        return result;
      },
      { hidden, itemType } as Dict
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
        <Radio.Group
          onChange={e => setItemType(e.target.value)}
          value={itemType}
        >
          <Radio value={ItemType.SUBPAGE}>{ItemType.SUBPAGE}</Radio>
          <Radio value={ItemType.HREF}>{ItemType.HREF}</Radio>
          <Radio value={ItemType.NORMAL}>{ItemType.NORMAL}</Radio>
          <Radio value={ItemType._M}>{ItemType._M}</Radio>
        </Radio.Group>
        <Button onClick={submit}>Submit</Button>
      </Col>
    </Row>
  );
};

export default AddFirstItem;
