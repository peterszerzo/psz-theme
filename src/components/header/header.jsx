import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

import {MainLogo, Falafel} from '../icons/icons.jsx';
import ModalNav from '../modal_nav/modal_nav.jsx';
import buttons from './buttons.json';

import './header.scss';

export default class Header extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
    this.toggleExpandedState = this.toggleExpandedState.bind(this);
  }

  render() {
    const {windowWidth, windowHeight, scrollTop} = this.props.ui;
    const {pathname} = this.props;
    const isDiscrete = windowWidth < 600 || (([ '/projects', '/blog' ].indexOf(pathname) === -1) && (windowHeight > scrollTop));
    const isTransparent = windowHeight - 70 > scrollTop;

    const cls = classNames({
      'header': true,
      'header--discrete': isDiscrete,
      'header--expanded': this.state.isExpanded,
      'header--transparent': isTransparent
    });

    return (
      <header className={cls}>
        <Link className='header__icon header__main-link' to='/'>
          <MainLogo />
        </Link>
        <nav className='header__icon header__falafel' onClick={this.toggleExpandedState}>
          <Falafel/>
        </nav>
        <ModalNav
          isExpanded={this.state.isExpanded}
          buttons={buttons}
          toggleExpandedState={this.toggleExpandedState}
        />
      </header>
    );
  }

  renderList() {
    return buttons.map((button, i) => {
      const {url, name} = button;
      return (
        <li key={i} >
          <Link className='header__nav__item' to={url}>
            { name }
          </Link>
        </li>
      );
    });
  }

  toggleExpandedState() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

}
