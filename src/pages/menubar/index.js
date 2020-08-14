import React from 'react';
import { Layout, Menu, message } from 'antd';
import MenuItem from './menuItem';
import httpRequest from '@config/axios';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
    }
  }

  componentDidMount() {
    // this.fetchMenuList();
  }

  async fetchMenuList() {
    const res = await httpRequest('get', '/sys/menus');
    if (res.data.success) {
      this.setState({
        menuList: res.data.data,
      })
    } else {
      message.error('获取菜单列表失败');
    }
  }

  render() {
    return (
      <MenuItem menuList={this.state.menuList} />
    );
  }
}