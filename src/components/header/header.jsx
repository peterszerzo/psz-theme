import React, {Component} from 'react';
import classNames from 'classnames';

import {MainLogo, Falafel} from '../icons/icons.jsx';
import ModalNav from '../modal_nav/modal_nav.jsx';
import buttons from './buttons.json';

import './header.scss';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
    this.toggleExpandedState = this.toggleExpandedState.bind(this);
  }

  render() {
    const {windowHeight, scrollTop, scrollDirection} = this.props.ui;
    const isTransparent = windowHeight - 70 > scrollTop;
    const isHidden = (scrollTop > (windowHeight - 70)) && (scrollDirection === 'down');

    const cls = classNames({
      'header': true,
      'header--expanded': this.state.isExpanded,
      'header--hidden': isHidden,
      'header--transparent': isTransparent
    });

    return (
      <header className={cls}>
        <a className='header__icon header__main-link' href='/'>
          <MainLogo />
        </a>
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

  toggleExpandedState() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

}
