import React from 'react';

import Banner from './banner.jsx';
import Animation from './globe_animation/root.jsx';

const FADE_OUT_IN = 4500;
const DO_NOT_REAPPEAR_ON_HOVER_FOR = 9000;

export default class WelcomeContent extends React.Component {

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
    const {ui} = this.props;
    const imageUrl = (process.env.NODE_ENV === 'production') ? '/assets/images/sky-1200.jpg' : '/images/sky-1200.jpg';
    return (
      <div className='welcome'>
        <div className='welcome__background' style={{backgroundImage: `url(${imageUrl})`}}/>
        <div className='welcome__globe'>
          <Animation
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
    return (
      <div className='welcome__message' style={style}>
        {'hey, welcome! click a triangle for random content :)'}
      </div>
    );
  }

  componentWillUnmount() {
    Object.keys(this.timeouts).forEach((key) => {
      clearTimeout(this.timeouts[key]);
    });
  }

  navigateToRandomPost() {
    const {posts} = this.props;
    let randomPostSlug;
    if (posts) {
      randomPostSlug = posts[Math.floor(posts.length * Math.random())].slug;
    }
    if (randomPostSlug) {
      let url = `/${randomPostSlug}`;
      // TODO: implement
      // dispatch(setUrl(url));
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
