import React from 'react';
import { Card, Typography, Icon, Button } from 'antd';
import { blue } from '@ant-design/colors';
import './index.css'
import QRCodeLogin from '@pages/login/content/qrCodeLogin';
import MobileLogin from '@pages/login/content/mobileLogin';

const { Title }= Typography;

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginType: 'qrCode',
    };
    this.changeLoginType = this.changeLoginType.bind(this);
  }

  changeLoginType(loginType) {
    return () => {
      this.setState({
        loginType,
      });
    }
  }

  render() {
    return (
      <div className="login-wrapper">
        <Card className="login-dialog">
          <Title style={{ color: blue.primary }} level={4}>登录</Title>
          {
            this.state.loginType === 'qrCode' ?
              <>
                <QRCodeLogin />
                <Button
                  icon="mobile"
                  type="primary"
                  onClick={this.changeLoginType('mobile')}
                >手机号登录</Button>
              </> :
              <MobileLogin changeLoginType={this.changeLoginType('qrCode')}/>
          }
        </Card>
      </div>
    )
  }
}