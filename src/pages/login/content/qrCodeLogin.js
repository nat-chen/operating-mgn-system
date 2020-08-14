import React from 'react';
import { Typography, message, Button } from 'antd';
import { blue } from '@ant-design/colors';
import './qrCodeLogin.css';
import httpRequest from '@config/axios';
import domain from '@config/domain';
import getUuid from '@utils/uuid';

const { Title } = Typography;

function CodeMaskLayer(props) {
  return (
    <div className="qr-mask">
      <Title type="danger"  level={4}>二维码已失效</Title>
      <br />
      <Button onClick={props.updateUuid}>点击刷新二维码</Button>
    </div>
  );
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.pollTimer = null;
    this.state = {
      qrCodeUrl: '',
      isLogin: false,
      isCodeValid: true,
      uuid: getUuid(),
    };
    this.updateUuid = this.updateUuid.bind(this);
  }

  componentDidMount() {
    this.setState({
      qrCodeUrl: `${domain.requestRoot}/auth/qrconnect/login/${this.state.uuid}?loginType=admin`
    });
    this.pollTimer = setInterval(() => {
      this.pollLoginStatus();
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
  }

  updateUuid() {
    clearInterval(this.pollTimer);
    const newUuid = getUuid();
    this.setState({
      qrCodeUrl: `${domain.requestRoot}/auth/qrconnect/login/${newUuid}?loginType=admin`,
      uuid: newUuid,
      isCodeValid: true,
    });
    this.pollTimer = setInterval(() => {
      this.pollLoginStatus();
    }, 5000)
  }

  async pollLoginStatus() {
    const res = await httpRequest('get', `/auth/wechat/login/polling/${this.state.uuid}`)
    if (res.data.success) {
      message.success('扫码成功，即将跳转');
    } else {
      if (res.data.resultCode === -1) {
        this.setState({
          isCodeValid: false,
        })
      }
    }
  }

  render() {
    return (
      <div
        className='login-layer'
        style={{
          backgroundImage: `url(${this.state.qrCodeUrl})`,
        }}
      >
        { !this.state.isCodeValid && <CodeMaskLayer updateUuid={this.updateUuid} /> }
      </div>
    )
  }
}