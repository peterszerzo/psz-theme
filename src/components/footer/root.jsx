import React from 'react'

import links from './links.json'
import messages from './messages.json'

export default class Footer extends React.Component {

  constructor(props) {
    super(props)
    this.changeMessage = this.changeMessage.bind(this)
    this.state = {
      activeMessageIndex: 0
    }
  }

  render() {
    return (
      <footer className='footer'>
        <div className='footer__background' />
        <div className='footer__overlay' />
        <div className='footer__intro'>
          <p>This is a site by Peter.</p>
        </div>
        <div className='footer__links'>
          { this.renderLinks() }
        </div>
        <div className='footer__messages'>
          <p>{ messages[this.state.activeMessageIndex] }</p>
        </div>
      </footer>
    )
  }

  renderLinks() {
    return links.map((link, i) => {
      const {name, url} = link
      return <a key={i} className='link' href={url}>{name}</a>
    })
  }

  componentDidMount() {
    this.changeInterval = setInterval(this.changeMessage, 2500)
  }

  componentWillUnmount() {
    clearInterval(this.changeInterval)
  }

  changeMessage() {
    let i = this.state.activeMessageIndex
    const n = messages.length
    if (i === n - 1) {
      return this.setState({
        activeMessageIndex: 0
      })
    }
    this.setState({
      activeMessageIndex: i + 1
    })
  }

}
