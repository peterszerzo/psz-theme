import React from 'react';

import PostContainer from './../../containers/post_container.jsx';
import NowContent from './content.jsx';

export default function Now(props) {
  return (
    <PostContainer slug='now'>
      <NowContent />
    </PostContainer>
  );
}
