import React from 'react'

import PostSummariesContainer from './../../containers/post_summaries_container.jsx'
import WelcomeContent from './content.jsx'

export default function Welcome(props, context) {
  return (
    <PostSummariesContainer>
      <WelcomeContent />
    </PostSummariesContainer>
  )
}
