import React, {Component} from 'react';
import {connect} from 'react-redux';

import {requestPostSummaries} from '../actions/post.js';

class PostSummariesContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const posts = this.getFilteredPosts();
    return React.cloneElement(this.props.children, {
      posts: posts,
      ui: this.props.ui
    });
  }

  componentDidMount() {
    this.props.dispatch(requestPostSummaries());
  }

  getPosts() {
    const {postSummaries} = this.props;
    if (!postSummaries) {
      return [];
    }
    return postSummaries.data || [];
  }

  getFilteredPosts() {
    const posts = this.getPosts();
    const {activeTagName} = this.props;
    if (!activeTagName) {
      return posts;
    }
    return posts.filter((post) => {
      const tagNames = post.tags.map(tag => tag.name);
      return tagNames.indexOf(activeTagName) > -1;
    });
  }

}

function mapStateToProps(state) {
  return {
    ui: state.ui,
    postSummaries: state.posts.summaries
  };
}

export default connect(mapStateToProps)(PostSummariesContainer);
