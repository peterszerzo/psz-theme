import React from 'react';

import * as icons from '../icons/icons.jsx';
import links from './links.json';
import messages from './messages.json';

import './footer.scss';

export default class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.changeMessage = this.changeMessage.bind(this);
    this.state = {
      activeMessageIndex: 0
    };
  }

  render() {
    return (
      <footer className='footer'>
        <div className='footer__background'/>
        <div className='footer__messages'>
          <p>{messages[this.state.activeMessageIndex]}</p>
        </div>
        <div className='footer__title'>
          <p>peterszerzo.com</p>
        </div>
        <div className='footer__links'>
          {this.renderLinks()}
        </div>
      </footer>
    );
  }

  renderLinks() {
    return links.map((link, i) => {
      const {name, url} = link;
      return (
        <a
          key={i}
          className='link'
          href={url}
          style={{width: '20px', 'height': '20px'}}
        >
          {React.createElement(icons[name])}
        </a>
      );
    });
  }

  componentDidMount() {
    this.changeInterval = setInterval(this.changeMessage, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.changeInterval);
  }

  changeMessage() {
    const i = this.state.activeMessageIndex;
    const n = messages.length;
    const newIndex = (i === n - 1) ? 0 : (i + 1);
    this.setState({
      activeMessageIndex: newIndex
    });
  }

}
