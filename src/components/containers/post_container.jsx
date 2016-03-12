import React from 'react'
import {connect} from 'react-redux'

import fetchSinglePost from './../../utilities/fetch_single_post.js'

class PostContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isFetching: false
    }
  }

  render() {
    const post = this.getPost()
    return (
      <div>
        {React.cloneElement(this.props.children, {
          post: post
        })}
      </div>
    )
  }

  componentDidMount() {
    const post = this.getPost()
    if (!post && !this.state.isFetching) {
      this.fetchPost()
    }
  }

  getPost() {
    const {slug, postsBySlug} = this.props
    if (!postsBySlug || !postsBySlug[slug] || postsBySlug[slug].status !== 'success') {
      return
    }
    return postsBySlug[slug].data
  }

  fetchPost() {
    this.setState({
      isFetching: true
    })
    const {slug} = this.props
    fetchSinglePost(slug)
      .then((posts) => {
        this.props.dispatch({
          type: 'FETCH_SINGLE_POST_SUCCESS',
          data: posts[0]
        })
      })
  }
}


export default connect(state => ({
  ui: state.ui,
  postsBySlug: state.entities.posts.bySlug
}))(PostContainer)
