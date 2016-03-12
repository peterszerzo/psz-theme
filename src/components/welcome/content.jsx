import React from 'react'
import {Link} from 'react-router'

import Sign from './../elements/sign.jsx'
import Animation from './globe_animation/root.jsx'

const FADE_OUT_IN = 4500
const DO_NOT_REAPPEAR_ON_HOVER_FOR = 9000

export default class WelcomeContent extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.navigateToRandomPost = this.navigateToRandomPost.bind(this)
    this.triggerMessage = this.triggerMessage.bind(this)
    this.hideMessage = this.hideMessage.bind(this)
    this.allowMessageShow = this.allowMessageShow.bind(this)
    this.hideMessageTimeout = null
    this.allowMessageShowTimeout = null
    this.state = {
      isMessageShowing: true,
      shouldMessageShowOnHover: true
    }
  }

  render() {
    const { ui } = this.props
    return (
      <div className='welcome'>
        <div className='welcome__content'>
          <div className='welcome__background'></div>
          <div className='welcome__globe'>
            <Animation
              width={ui.windowWidth}
              height={ui.windowHeight}
              navigateToRandomPost={this.navigateToRandomPost}
              triggerMessage={this.triggerMessage}
            />
          </div>
          <Link className="welcome__summary" to='/projects'>
            <Sign />
          </Link>
          { this.renderMessage() }
        </div>
      </div>
    )
  }

  renderMessage() {
    const style = this.state.isMessageShowing ? {opacity: 1} : {opacity: 0}
    return (
      <div className='welcome__message' style={style}>
        {'hey, welcome! click a triangle for random content :)'}
      </div>
    )
  }

  navigateToRandomPost() {
    const {posts} = this.props
    const {router} = this.context
    let randomPostSlug
    if (posts) {
      randomPostSlug = posts[Math.floor(posts.length * Math.random())].slug
    }
    if (randomPostSlug) {
      let url = `/${randomPostSlug}`
      router.push(url)
    }
  }

  triggerMessage() {
    if (!this.state.shouldMessageShowOnHover) { return }
    this.setState({
      isMessageShowing: true,
      shouldMessageShowOnHover: true
    })
    if (this.hideMessageTimeout) { clearTimeout(this.hideMessageTimeout) }
    if (this.allowMessageShowTimeout) { clearTimeout(this.allowMessageShowTimeout) }
    this.hideMessageTimeout = setTimeout(this.hideMessage, FADE_OUT_IN)
    this.allowMessageShowTimeout = setTimeout(this.allowMessageShow, DO_NOT_REAPPEAR_ON_HOVER_FOR)
  }

  hideMessage() {
    this.setState({isMessageShowing: false})
  }

  allowMessageShow() {
    this.setState({shouldMessageShowOnHover: true})
  }

}
