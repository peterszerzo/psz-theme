import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setLoadedImage} from '../../actions/ui';
import {animatedScrollTo} from '../../effects/scroll';

import siteInfo from '../../info.json';
import {Down} from '../icons/icons.jsx';

import './hero.scss';

class Hero extends Component {

  constructor(props) {
    super(props);
    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  render() {
    const {title, subtitle, text, ui} = this.props;
    return (
      <div className='hero' style={{height: ui.windowHeight}}>
        {this.renderTestImage()}
        <div
          className='hero__background hero__background--blurred'
          style={this.getBackgroundStyle()}
        />
        <div className='hero__overlay' style={this.getOverlayStyle()}/>
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
    if (!this.getImageUrl()) {
      return null;
    }
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
    if (!image) {
      return null;
    }
    return `${siteInfo.siteUrl}${image}`;
  }

  getBackgroundStyle() {
    const imageUrl = this.getImageUrl();
    if (!this.isImageLoaded() || !imageUrl) {
      return {};
    }
    return {
      'backgroundImage': `url(${imageUrl})`
    };
  }

  getOverlayStyle() {
    const opacity = this.isImageLoaded() ? '0.6' : '1';
    return {
      'opacity': opacity
    };
  }

  isImageLoaded() {
    return this.props.ui.loadedImages.indexOf(this.getImageUrl()) > -1;
  }

  handleImageLoad() {
    this.props.dispatch(setLoadedImage(this.getImageUrl()));
  }

  scroll() {
    animatedScrollTo(this.props.ui.windowHeight - 70);
  }
}

export default connect(state => ({
  ui: state.ui
}))(Hero);
