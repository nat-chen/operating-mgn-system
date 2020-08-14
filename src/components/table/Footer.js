import React from 'react';
import { Row, Col, Select, Button, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined  } from '@ant-design/icons';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      pageSizeList: this.props.pageSizeList || [10, 20, 30],
    }
  }

  handlePageSizeChange(value) {
    this.props.onFilterChange({size: value})
  }

  handleFilterChange(value) {
    return () => {
      this.props.onFilterChange(value);
    }
  }

  render() {
    const firstPageNo = (this.props.filter.page - 1) * this.props.filter.size + 1;
    const lastPageNo = firstPageNo + this.props.list.length - 1;
    return (
      <Row style={{width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Col>
          每页条数:
          <Select
            defaultValue={this.state.pageSizeList[0]}
            onChange={this.handlePageSizeChange}
            style={{
              width: 68,
              margin: '20px 20px 0'
            }}
          >
            {this.state.pageSizeList.map((item, index) =>
              <Select.Option key={index} value={item}>{item}</Select.Option>
            )}
          </Select>
          {firstPageNo}-{lastPageNo}共 {this.props.totalCount} 条
          <Button
            shape="circle"
            icon={<RightOutlined />}
            style={{marginLeft: 20}}
            disabled={this.props.filter.page === 1}
            onClick={this.handleFilterChange({page: this.props.filter.page - 1})}
          />
          <Button
            shape="circle"
            icon={<RightOutlined />}
            style={{marginLeft: 20}}
            disabled={this.props.list.length < this.props.filter.size }
            onClick={this.handleFilterChange({page: this.props.filter.page + 1})}
          />
        </Col>
      </Row>
    )
  }
}