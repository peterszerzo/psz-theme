import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
// import Velocity from 'velocity-animate';

import siteInfo from './../../info.json';
import {Down} from './../elements/icons.jsx';

// import $ from 'jquery';

export default class Hero extends Component {

  static contextTypes = {
    windowWidth: PropTypes.number,
    windowHeight: PropTypes.number,
    scrollTop: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      isImageLoaded: false
    };
    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  render() {
    const {title, subtitle, text} = this.props;
    return (
      <div className='hero'>
        {this.renderTestImage()}
        <div
          className='hero__background hero__background--blurred'
          style={this.getBackgroundStyle()}
        />
        <div className='hero__overlay' style={ this.getOverlayStyle() }/>
        <div className='hero__title-bar'>
          <div className='hero__title-bar__content'>
            <h1 className='title'>{title}</h1>
            <h2 className='headline'>{subtitle}</h2>
          </div>
        </div>
        <div className='hero__text'>{text}</div>
        <div className='hero__arrow' onClick={this.scroll}>
          <Down/>
        </div>
      </div>
    );
  }

  renderTestImage() {
    return (
      <img
        style={{
          opacity: 0.1,
          width: 10,
          height: 10,
          position: 'fixed'
        }}
        src={this.getImageUrl()}
        onLoad={this.handleImageLoad}
      />
  );
  }

  componentDidMount() {
    const node = document.getElementsByClassName('wrapper')[0];
    node.scrollTop = 0;
  }

  getImageUrl() {
    const {image} = this.props;
    const imageUrl = `${siteInfo.siteUrl}${image}`;
    return imageUrl;
  }

  getBackgroundStyle() {
    if (!this.state.isImageLoaded) {
      return {};
    }
    return {
      'backgroundImage': `url(${this.getImageUrl()})`
    };
  }

  getOverlayStyle() {
    const opacity = this.state.isImageLoaded ? '0.6' : '1';
    return {
      'opacity': opacity
    };
  }

  handleImageLoad() {
    this.setState({
      isImageLoaded: true
    });
  }

  scroll() {
    const root = findDOMNode(this);
    const node = document.getElementsByClassName('wrapper')[0];
    const offset = this.context.windowHeight - 70;
    // Velocity(root, 'scroll', {
    //   duration: 1000,
    //   offset: -100
    // });
    $(node).animate({scrollTop: offset}, 1000);
  }
}
