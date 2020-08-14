import React from 'react';
import { Select, Modal, message, Row } from 'antd';
import httpRequest from '@config/axios';

export default class extends React.Component {
  state = {
    dialogVisible: false,
    staffList: [],
    selectedStaff: null,
  }

  componentDidMount() {
    this.fetchStaffList();
  }

  fetchStaffList = async () => {
    const res = await httpRequest('get', '/common/follower/sales');
    if (res.data.success) {
      this.setState({
        staffList: res.data.data.data,
      });
    } else {
      message.error('获取客户列表失败');
    }
  }

  handleStaffChange = (text, item) => {
    this.setState({
      selectedStaff: item,
    });
  }

  closeDialog = (isSave) => {
    if (isSave) {
      this.submitCustomerTransfer();
    }
    this.props.closeDialog('customerTransferDialog', isSave);
  }
  submitCustomerTransfer = async () => {
    const params = {
      sales: this.state.selectedStaff.value,
      salesId: this.state.selectedStaff.children
    };
    const res = await httpRequest('put', `/sales/customer/${this.props.currentCustomer.id}/transfer`, params);
    if (res.data.success) {
      message.success('客户分配成功');
    } else {
      message.error('客户移交失败');
    }
  }

  render() {
    return (
      <Modal
        title="客户移交"
        centered
        visible
        onOk={() => this.closeDialog(true)}
        onCancel={() => this.closeDialog(false)}
      >
        <Select
          style={{width: '100%'}}
          showSearch
          placeholder="姓名"
          onChange={this.handleStaffChange}
        >
          {this.state.staffList.map(item =>
            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
          )}
        </Select>
      </Modal>
    )
  }
}