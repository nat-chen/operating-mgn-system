import React from 'react';
import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import httpRequest from '@config/axios';
import './mobileLogin.css';
import validatorRules from '@utils/validator';



export default class MobileLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCodeSending: false,
      isTickAgreement: false,
      mobile: '',
      code: '',
    }
  }

  sendCode = async () => {
    if (!this.state.isMobileValid) {
      this.props.form.setFields({
        mobile: {
          errors: [{
            field: "mobile",
            message: "请输入有效手机号"
          }]
        }
      });
      return false;
    }
    const params = {
      mobilePhone: this.state.mobile,
    }
    const res = await httpRequest('get', '/uc/login/mobile/captcha', params);
    if (res.data.success) {
      this.setState({
        isCodeSending: true,
      })
      message.success('发送成功。请注意查收！');
    } else {
      message.error('发送失败');
    }
  }

  submitLogin = event => {
    event.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        const params = {
          mobilePhone: this.state.mobile,
          captcha: this.state.code,
          loginType: 'admin'
        }
        httpRequest('post', '/authentication/mobile', params).then(async res => {
          if (res.data.success) {
            message.success('登录成功');
          } else {
            message.error('登录失败');
          }
        })
      }
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="mobile-login">
        <Form.Item
          style={{ margin: 0 }}
          rules={[{
            required: true,
            message: '请输入有效手机号',
            validator: (rule, value) => {
              const isValid = validatorRules.isMobile.test(value);
              this.setState({
                mobile: value,
                isMobileValid: isValid,
              });
              return isValid;
            }
          }]}
        >
          <Input size="large" placeholder="*手机号" />
        </Form.Item>
        <Form.Item
          style={{ marginTop: 24, marginBottom: 0 }}
          rules={[{
            required: true,
            message: '请输入 4 位数的验证码',
            validator: (rule, value) => {
              const isValid = !!(value && value.length === 4);
              this.setState({
                code: isValid ? value : '',
              });
              return isValid;
            }
          }]}
        >
          <Input
            size="large"
            placeholder="*验证码"
            addonAfter={
              <Button
                type="link"
                onClick={this.sendCode}
                disabled={this.state.isCodeSending}
              >{this.state.isCodeSending ? '验证码已发送' : '获取验证码'}</Button>
            }
          />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: '请勾选服务协议',
            validator: (rule, value) => {
              this.setState({
                isTickAgreement: value,
              });
              return value;
            }
          }]}
        >
          <Checkbox>同意服务协议</Checkbox>
          <br />
        </Form.Item>
        <Row
          type="flex"
          justify="space-between"
          style={{
            marginTop: 24,
        }}>
          <Col span={11}>
            <Button
              size="large"
              style={{ width: '100%'}}
              type="primary"
              ghost
              shape="round"
              onClick={this.props.changeLoginType}
            >返回</Button>
          </Col>
          <Col span={11}>
            <Button
              size="large"
              style={{ width: '100%'}}
              type="primary"
              shape="round"
              onClick={this.submitLogin}
              disabled={!this.state.isTickAgreement}
            >登录</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}