import React from 'react';
import { Row, Select } from 'antd';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        每页条数：
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
          <Select.Option value="jack">Jack</Select.Option>
          <Select.Option value="lucy">Lucy</Select.Option>
          <Select.Option value="disabled" disabled>
            Disabled
          </Select.Option>
          <Select.Option value="Yiminghe">yiminghe</Select.Option>
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} disabled>
          <Select.Option value="lucy">Lucy</Select.Option>
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} loading>
          <Select.Option value="lucy">Lucy</Select.Option>
        </Select>
      </Row>
    )
  }
}