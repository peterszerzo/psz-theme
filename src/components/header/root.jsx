import React from 'react'
import classNames from 'classnames'
import {Link} from 'react-router'

import {BackToMain, Falafel} from './../elements/buttons.jsx'
import buttons from './buttons.json'

export default class Header extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.toggleExpandedState = this.toggleExpandedState.bind(this)
    this.state = {
      isExpanded: false
    }
  }

  render() {
    const {windowWidth, windowHeight, scrollTop} = this.props.ui
    const {pathname} = this.props
    const isDiscrete = windowWidth < 600 || (([ '/projects', '/blog' ].indexOf(pathname) === -1) && (windowHeight > scrollTop))
    const isTransparent = ([ '/projects', '/blog' ].indexOf(pathname) !== -1) || (windowHeight > scrollTop)

    const cls = classNames({
      'header': true,
      'header--discrete': isDiscrete,
      'header--expanded': this.state.isExpanded,
      'header--transparent': isTransparent
    })

    // Do not show if at root route.
    const opacity = (pathname === '/') ? '0' : '1'

    return (
      <header className={ cls } style={{opacity: opacity}}>

        <Link className='header__icon header__main-link' to='/'>
          <BackToMain />
        </Link>

        <nav className='header__icon header__falafel' onClick={this.toggleExpandedState}>
          <Falafel/>
        </nav>

        { this.renderModalNav() }

      </header>
    )
  }

  renderList() {
    return buttons.map((button, i) => {
      const {url, name} = button
      return (
        <li key={i} >
          <Link className='header__nav__item' to={url}>
            { name }
          </Link>
        </li>
      )
    })
  }

  renderModalList() {
    return buttons.map((button, i) => {
      const {url, name} = button
      return (
        <li key={i} >
          <Link
            activeClassName='header__modal-nav__item--active'
            className='header__modal-nav__item'
            to={url}
            onClick={this.toggleExpandedState}
          >
            { name }
          </Link>
        </li>
      )
    })
  }

  renderModalNav() {
    if (!this.state.isExpanded) { return }
    return (
      <nav className='header__modal-nav'>
        <div className='close-button' onClick={ this.toggleExpandedState }>
          <Falafel />
        </div>
        <ul className='header__modal-nav__items'>
          { this.renderModalList() }
        </ul>
      </nav>
    )
  }

  toggleExpandedState() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

}
