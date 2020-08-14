import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';

export default () => {
  const currentYear = new Date().getFullYear();
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
      }}
    >
      <CopyrightOutlined />
      {currentYear} Nat Chen
    </div>
  )
}