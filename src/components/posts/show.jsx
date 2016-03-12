import React from 'react'

import PostContainer from './../containers/post_container.jsx'
import Post from './post.jsx'

function Show(props, context) {
  const slug = props.slug || props.location.pathname.slice(1)
  return (
    <PostContainer
      slug={ slug }
    >
      <Post />
    </PostContainer>
  )
}

export default Show
