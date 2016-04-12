import React from 'react'

import PostContainer from './../../containers/post_container.jsx'
import Post from './post.jsx'

function Show(props, context) {
  let slug = props.slug || props.location.pathname
  if (slug[0] === '/') {
    slug = slug.slice(1)
  }
  if (slug[slug.length - 1] === '/') {
    slug = slug.slice(0, -1)
  }
  return (
    <PostContainer slug={slug}>
      <Post />
    </PostContainer>
  )
}

export default Show
