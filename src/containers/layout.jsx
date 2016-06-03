import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

import * as components from '../components/index.js';

import getRoute from '../routes/router.js';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import {setScroll} from '../actions/ui.js';

class Layout extends Component {

  constructor(props) {
    super(props);
    this.updateScrollTop = this.updateScrollTop.bind(this);
  }

  render() {
    return (
      <div className='wrapper' onScroll={this.updateScrollTop}>
        <Header
          ui={this.props.ui}
          url={this.props.url}
        />
          {this.renderRouteComponent()}
        <Footer />
      </div>
    );
  }

  renderRouteComponent() {
    const {url} = this.props;
    const {componentName, props, routeParams} = getRoute(url);
    const Comp = components[componentName];
    return (
      <Comp
        {...props}
        {...routeParams}
        ui={this.props.ui}
      />
    );
  }

  updateScrollTop(e) {
    const node = findDOMNode(this);
    const scrollDirection = (this.props.ui.scrollTop > node.scrollTop) ? 'up' : 'down';
    this.props.dispatch(setScroll(node.scrollTop, scrollDirection));
  }

}

export default connect(state => ({
  ui: state.ui,
  url: state.url,
  post: state.post
}))(Layout);
