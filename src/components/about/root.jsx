import React from 'react'

import PostContainer from './../../containers/post_container.jsx'
import AboutContent from './content.jsx'

export default function About(props) {
  return (
    <PostContainer slug='about'>
      <AboutContent />
    </PostContainer>
  )
}
