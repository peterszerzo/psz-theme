import React from 'react'
import {connect} from 'react-redux'

import fetchPostSummaries from './../../utilities/fetch_post_summaries.js'

class PostSummariesContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isFetching: false
    }
  }

  render() {
    const posts = this.getFilteredPosts()
    return (
      <div>
        {React.cloneElement(this.props.children, {
          posts: posts || [],
          ui: this.props.ui
        })}
      </div>
    )
  }

  componentDidMount() {
    const posts = this.getPosts()
    if (!posts && !this.state.isFetching) {
      this.fetch()
    }
  }

  getPosts() {
    const {postSummaries} = this.props
    if (!postSummaries) { return }
    const {status, data} = postSummaries
    if (status === 'success') { return data }
  }

  getFilteredPosts() {
    const posts = this.getPosts()
    if (!posts) {
      return []
    }
    const {activeTagName} = this.props
    if (!activeTagName) { return posts }
    return posts.filter((post) => {
      const tagNames = post.tags.map(tag => tag.name)
      return tagNames.indexOf(activeTagName) > -1
    })
  }

  fetch() {
    fetchPostSummaries()
      .then((posts) => {
        this.props.dispatch({type: 'FETCH_ALL_POST_SUMMARIES_SUCCESS', data: posts})
      }).catch((err) => { console.log(err.stack) })
  }

}

export default connect(state => ({
  ui: state.ui,
  postSummaries: state.entities.posts.summaries
}))(PostSummariesContainer)
