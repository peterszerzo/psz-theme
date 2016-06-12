import React, {Component} from 'react';

import {setUrl} from '../../actions/url.js';
import Banner from './banner.jsx';
import Loader from '../loader/loader.jsx';
import GlobeAnimation from '../globe_animation/globe_animation.jsx';
import siteInfo from '../../info.json';

const FADE_OUT_IN = 4500;
const DO_NOT_REAPPEAR_ON_HOVER_FOR = 9000;

export default class WelcomeContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMessageShowing: true,
      shouldMessageShowOnHover: true
    };
    this.navigateToRandomPost = this.navigateToRandomPost.bind(this);
    this.triggerMessage = this.triggerMessage.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
    this.allowMessageShow = this.allowMessageShow.bind(this);
    this.timeouts = {
      hideMessage: null,
      allowMessageShow: null
    };
  }

  render() {
    const {ui, post} = this.props;
    if (!post || !post.image) {
      return <Loader/>;
    }
    const imageUrl = this.getImageUrl();
    return (
      <div className='welcome'>
        <div className='welcome__background' style={{backgroundImage: `url(${imageUrl})`}}/>
        <div className='welcome__globe'>
          <GlobeAnimation
            width={ui.windowWidth}
            height={ui.windowHeight}
            navigateToRandomPost={this.navigateToRandomPost}
            triggerMessage={this.triggerMessage}
          />
        </div>
        <a className='welcome__summary' href='/projects'>
          <Banner/>
        </a>
        {this.renderMessage()}
      </div>
    );
  }

  renderMessage() {
    const style = this.state.isMessageShowing ? {opacity: 1} : {opacity: 0};
    const {post} = this.props;
    return (
      <div
        className='welcome__message'
        style={style}
      >
        {post.markdown}
      </div>
    );
  }

  componentWillUnmount() {
    Object.keys(this.timeouts).forEach((key) => {
      clearTimeout(this.timeouts[key]);
    });
  }

  getImageUrl() {
    const {image} = this.props.post;
    if (!image) {
      return null;
    }
    return `${siteInfo.siteUrl}${image}`;
  }

  navigateToRandomPost() {
    const {posts} = this.props;
    let randomPostSlug;
    if (posts) {
      randomPostSlug = posts[Math.floor(posts.length * Math.random())].slug;
    }
    if (randomPostSlug) {
      let url = `/${randomPostSlug}`;
      this.props.dispatch(setUrl(url));
    }
  }

  triggerMessage() {
    if (!this.state.shouldMessageShowOnHover) {
      return;
    }
    this.setState({
      isMessageShowing: true,
      shouldMessageShowOnHover: true
    });
    if (this.timeouts.hideMessage) {
      clearTimeout(this.timeouts.hideMessage);
    }
    if (this.timeouts.allowMessageShow) {
      clearTimeout(this.timeouts.allowMessageShow);
    }
    this.timeouts.hideMessage = setTimeout(this.hideMessage, FADE_OUT_IN);
    this.timeouts.allowMessageShow = setTimeout(this.allowMessageShow, DO_NOT_REAPPEAR_ON_HOVER_FOR);
  }

  hideMessage() {
    this.setState({isMessageShowing: false});
  }

  allowMessageShow() {
    this.setState({shouldMessageShowOnHover: true});
  }
}
