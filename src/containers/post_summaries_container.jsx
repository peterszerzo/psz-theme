import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import fetchPostSummaries from '../utilities/fetch_post_summaries.js';

class PostSummariesContainer extends Component {

  static propTypes = {
    posts: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }

  render() {
    const posts = this.getFilteredPosts();
    return (
      <div>
        {React.cloneElement(this.props.children, {
          posts: posts || [],
          ui: this.props.ui
        })}
      </div>
    );
  }

  componentDidMount() {
    const posts = this.getPosts();
    if (!posts && !this.state.isFetching) {
      this.fetch();
    }
  }

  getPosts() {
    const {postSummaries} = this.props;
    if (!postSummaries) {
      return;
    }
    const {status, data} = postSummaries;
    if (status === 'success') { return data; }
  }

  getFilteredPosts() {
    const posts = this.getPosts();
    if (!posts) {
      return [];
    }
    const {activeTagName} = this.props;
    if (!activeTagName) {
      return posts;
    }
    return posts.filter((post) => {
      const tagNames = post.tags.map(tag => tag.name);
      return tagNames.indexOf(activeTagName) > -1;
    });
  }

  fetch() {
    fetchPostSummaries()
      .then((posts) => {
        const sortedPosts = posts.sort((post1, post2) => {
          const date1 = new Date(post1.published_at);
          const date2 = new Date(post2.published_at);
          return date2.getTime() - date1.getTime();
        });
        this.props.dispatch({type: 'FETCH_ALL_POST_SUMMARIES_SUCCESS', data: sortedPosts});
      }).catch((err) => {
        console.log(err.stack);
      });
  }

}

function mapStateToProps(state) {
  return {
    ui: state.ui,
    postSummaries: state.entities.posts.summaries
  };
}

export default connect(mapStateToProps)(PostSummariesContainer);
