import React from 'react';
import { Layout, Row, Col, Input, Button, Typography, message, Dropdown, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import httpRequest from '@config/axios';
const { Header } = Layout;
const { Text } = Typography;
const { Search } = Input;

const exitButton = (
  <Menu>
    <Menu.Item>
    <Button type="link"><LogoutOutlined />退出</Button>
    </Menu.Item>
  </Menu>
)

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageCount: 0
    }
  }

  componentDidMount() {
    // this.fetchUnreadMessageCount();
  }

  async fetchUnreadMessageCount() {
    const res = await httpRequest('get', 'sys/notice/unread');
    if (res.data.success) {
      this.setState({
        messageCount: res.data.data,
      })
      message.success('发送成功。请注意查收！');
    } else {
      message.error('发送失败');
    }
  }

  render() {
    return (
      <Header style={{ padding: '0 24px'}}>
        <Row type="flex" align="middle" justify="space-between">
          <Row type="flex">
            <Col><Text style={{ color: '#fff', fontSize: 20 }}>运营管理系统</Text></Col>
            <Col style={{paddingLeft: 24}}>
              <Search
                placeholder="搜索菜单"
                onSearch={value => console.log(value)}
              />
            </Col>
          </Row>
          <Col>
            <Button style={{ color: '#fff', fontSize: 16 }} type="link">消息({this.state.messageCount})</Button>
            <Dropdown overlay={exitButton}>
              <Button type="primary" shape="circle">Nat</Button>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    )
  }
}
