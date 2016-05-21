import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import {setScrollTop, setWindowDimensions} from '../actions/ui.js';

class Layout extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      router: this.context.router
    };
  }

  constructor(props) {
    super(props);
    this.setWindowDimensions = this.setWindowDimensions.bind(this);
    this.updateScrollTop = this.updateScrollTop.bind(this);
  }

  render() {
    return (
      <div className='wrapper' onScroll={this.updateScrollTop}>
        <Header
          ui={this.props.ui}
          pathname={this.props.location.pathname}
        />
        { React.cloneElement(this.props.children, {
          location: this.props.location,
          ui: this.props.ui
        }) }
        <Footer />
      </div>
    );
  }

  componentWillMount() {
    this.setWindowDimensions();
    // Component alive while app runs, no need to remove this event listener.
    window.addEventListener('resize', this.setWindowDimensions);
  }

  setWindowDimensions() {
    this.props.dispatch(setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    }));
  }

  updateScrollTop(e) {
    const node = findDOMNode(this);
    this.props.dispatch(setScrollTop(node.scrollTop));
  }

}

export default connect(state => ({
  ui: state.ui,
  post: state.post
}))(Layout);
