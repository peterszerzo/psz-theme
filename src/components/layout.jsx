import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

import Header from './header/root.jsx';
import Footer from './footer/root.jsx';

class Layout extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
    windowWidth: PropTypes.number,
    windowHeight: PropTypes.number,
    scrollTop: PropTypes.number
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired,
    windowWidth: PropTypes.number,
    windowHeight: PropTypes.number,
    scrollTop: PropTypes.number
  }

  getChildContext() {
    return {
      router: this.context.router,
      ...this.props.ui
    };
  }

  constructor(props) {
    super(props);
    this.setWindowDimensions = this.setWindowDimensions.bind(this);
    this.updateScrollTop = this.updateScrollTop.bind(this);
  }

  render() {
    console.log(this.props.entities);
    return (
      <div className='wrapper' onScroll={this.updateScrollTop}>
        <Header
          ui={this.props.ui}
          pathname={this.props.location.pathname}
        />
        { React.cloneElement(this.props.children, {
          location: this.props.location,
          uiState: this.props.ui
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
    this.props.dispatch({type: 'SET_WINDOW_DIMENSIONS', data: {
      height: window.innerHeight,
      width: window.innerWidth
    }});
  }

  updateScrollTop(e) {
    const node = findDOMNode(this);
    this.props.dispatch({type: 'SET_SCROLL_TOP', data: node.scrollTop});
  }

}

export default connect(state => ({
  ui: state.ui,
  entities: state.entities
}))(Layout);
