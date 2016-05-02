import React from 'react';

import PostSummariesContainer from '../../containers/post_summaries_container.jsx';
import Posts from './posts.jsx';

export default function Index(props) {
  return (
    <PostSummariesContainer activeTagName={props.activeTagName}>
      <Posts {...props}/>
    </PostSummariesContainer>
  );
}
