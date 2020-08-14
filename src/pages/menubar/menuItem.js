import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeysList: this.props.menuList.map((item, index) => index),
      currentOpenKeys: ['0'],
    }
    // this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleOpenChange = this.handleOpenChange.bind(this);
  }


  handleOpenChange(value) {
    this.setState({
      currentOpenKeys: value.slice(-1)
    })
  }

  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu
          mode="inline"
          openKeys={this.state.currentOpenKeys}
          onOpenChange={this.handleOpenChange}
          style={{ width: 256, height: '100%' }}
        >
          {
            this.props.menuList.map((item, index) => (
              <SubMenu
                key={index}
                title={<span>{item.name}</span>}
              >
                {
                  item.children.map((subItem, subIndex) =>
                    <Menu.Item
                      key={`${index}-${subIndex}`}
                      // onClick={this.handleMenuChange}
                    >{subItem.name}</Menu.Item>
                  )
                }
              </SubMenu>
            ))
          }
        </Menu>
      </Sider>
    )
  }
}