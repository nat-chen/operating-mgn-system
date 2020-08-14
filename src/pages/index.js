import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MenuBar from './menubar';
import TopBar from './topbar';
import { Layout } from 'antd';
import router from '@router/sales'
import './index.css'

const { Content } = Layout;

export default class extends React.Component {
  render() {
    return (
      <Layout style={{
        height: '100vh'
      }}>
        <TopBar />
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
          <MenuBar />
          <Content className="main-section">
            <Switch>
              {router.map((item, index) => (
                <Route exact
                  key={index}
                  path={item.path}
                  component={item.component}
                />
              ))}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}