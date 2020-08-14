import React from 'react';

console.log(require('@assets/img/logo/qxueyou_white.png'))
export default () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: `no-repeat url(${require('@assets/img/logo/qxueyou_white.png')}) 10% rgba(3,3,3, 0.3)`,
        height: 60,
        padding: '200',
      }}
    />
  )
}