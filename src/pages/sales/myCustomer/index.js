import React from 'react';
import { Row, Card, Button, Layout, message, Table } from 'antd';
import { SearchOutlined, UserAddOutlined, HistoryOutlined } from '@ant-design/icons';
import httpRequest from '@config/axios';
import TableFooter from '@components/table/Footer';
// import TableHeader from '@components/table/Header';
import VipLevelList from '@components/vipLevelList';
import CustomerTransfer from '@components/customerTransfer';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.getSerialNumber = this.getSerialNumber.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.getOptionList = this.getOptionList.bind(this);
    this.transferCustomer = this.transferCustomer.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.state = {
      filter: {
        vipLevel: '',
        status: 'finished',
        keyword: '',
        page: 1,
        size: 10,
      },
      customerList: [],
      customerTotalCount: 0,
      currentPageNo: 0,
      customerTransferDialog: false,
      currentCustomer: {},
    };
    this.columnList = [
      { title: '序号', render: this.getSerialNumber, key: 'id' },
      { title: '名称', dataIndex: 'name', key: 'name' },
      { title: '客户编码', dataIndex: 'code', key: 'code' },
      { title: 'Q 豆余额', dataIndex: 'qdBalance', key: 'qdBalance' },
      { title: '账户余额',dataIndex: 'accountBalance', key: 'accountBalance' },
      { title: 'VIP有效期',dataIndex: 'vipExpireTime', key: 'vipExpireTime' },
      { title: '注册时间', dataIndex: 'registerTime', key: 'registerTime' },
      { title: '成交时间', dataIndex: 'dealTime', key: 'dealTime' },
      { title: 'VIP 等级',dataIndex: 'vipLevel', key: 'vipLevel' },
      { title: '联系方式',dataIndex: 'mobilePhone', key: 'mobilePhone' },
      { title: '操作', render: item => this.getOptionList(item), key: 'optionList' }
    ];
    this.rowSelection = {
      onChange: this.toggleSelection,
      getCheckboxProps: this.getCheckboxProps,
    };
    this.optionsList = [
      { icon: SearchOutlined, handler: item => this.gotoCustomerProfile(item), },
      { icon: UserAddOutlined, handler: item => this.transferCustomer(item) },
      { icon: HistoryOutlined, handler: item => this.gotoFollowReocord(item), }
    ]
  }

  getSerialNumber(text, record, index) {
    return ((this.state.filter.page  - 1) * 10) + index + 1
  }

  getOptionList(currentItem) {
    return (
      <Row>
        {this.optionsList.map((item, index) =>
          <Button
            type="primary"
            size="small"
            shape="circle"
            style={{
              margin: '0 10px',
            }}
            key={index}
            icon={<item.icon />}
            onClick={item.handler(currentItem)}
          />
        )}
      </Row>
    )
  }

  gotoCustomerProfile() {

  }

  transferCustomer(item) {
    return () => {
      this.setState({
        customerTransferDialog: true,
        currentCustomer: item,
      });
    }
    
  }

  gotoFollowReocord() {

  }

  closeDialog(dialogName, isFetch) {
    this.setState({
      [dialogName]: false,
    });
    if (isFetch) {
      this.fetchCustomerList();
    }
  }

  toggleSelection(value1, value2) {
    // console.log(value1, value2);
  }

  getCheckboxProps(value) {
    // console.log(value);
  }

  componentDidMount() {
    this.fetchCustomerList();
  }

  async fetchCustomerList() {
    const res = await httpRequest('get', '/sales/customer', this.state.filter);
    if (res.data.success) {
      this.setState({
        customerList: res.data.data.data.map(item => {
          item.key = item.id;
          return item;
        }),
        customerTotalCount: res.data.data.totalCount,
      });
    } else {
      message.error('获取客户列表失败');
    }
  }

  handleFilterChange(value) {
    const page = value.size ? 1 : this.state.filter.page;
    this.setState({
      filter: {...this.state.filter, page, ...value, }
    }, () => {
      this.fetchCustomerList();
    });
  }

  render() {
    return (
      <Layout>
        <Card bodyStyle={{ paddingBottom: 24}}>
          <Row style={{width: '100%'}} type="flex" justify="end">
            <Button type="primary">移交</Button>
            <Button type="primary" style={{marginLeft: 24}}>导出</Button>
          </Row>
        </Card>

        <Card bodyStyle={{ paddingBottom: 24}}>
          {/* <TableHeader>

          </TableHeader> */}
          <Table
            rowSelection={this.rowSelection}
            dataSource={this.state.customerList}
            columns={this.columnList}
            pagination={false}
          />
          <TableFooter
            list={this.state.customerList}
            totalCount={this.state.customerTotalCount}
            filter={this.state.filter}
            onFilterChange={this.handleFilterChange}
          />
        </Card>

        {
          this.state.customerTransferDialog &&
            <CustomerTransfer
              closeDialog={this.closeDialog}
              currentCustomer={this.state.currentCustomer}
            />
        }
      </Layout>
    )
  }
}