import React from 'react';

import PostSummariesContainer from './../../containers/post_summaries_container.jsx';
import WelcomeContent from './content.jsx';

import './welcome.scss';

export default function Welcome(props) {
  return (
    <PostSummariesContainer {...props}>
      <WelcomeContent/>
    </PostSummariesContainer>
  );
}
