import React from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';


export default class extends React.Component {
  render() {
    return (
      <div
        className="welcome"
        style={{
          background: `center url(${require('@assets/img/welcome/background.png')})`,
          height: '100vh',
          width: '100vw',
        }}>
          <Header />
          <Content />
          <Footer />
      </div>
    )
  }
}
