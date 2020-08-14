import React from 'react';
import httpRequest from '@config/axios';
import { message, Select } from 'antd';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vipLevelList: [],
    }
  }

  componentDidMount() {
    this.fetchVipLevelList();
  }

  async fetchVipLevelList() {
    const res = await httpRequest('get', 'common/vipInfo');
    if (res.data.success) {
      this.setState({
        vipLevelList: res.data.data
      })
    } else {
      message.error('获取 VIP 等级失败');
    }
  }

  handleVipLevelChange(value) {
    console.log(value);
  }

  render() {
    return (
      <Select
        defaultValue={this.state.pageSizeList[0]}
        onChange={this.handlePageSizeChange}
        style={{
          width: 68,
          margin: '20px 20px 0'
        }}
      >
        {this.state.vipLevelList.map((item, index) =>
          <Select.Option key={index} value={item.level}>{item.levelName}</Select.Option>
        )}
      </Select>
    )
  }
}