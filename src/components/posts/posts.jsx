import React, {PropTypes} from 'react';

import Loader from '../loader/loader.jsx';
import Hero from '../hero/root.jsx';
import PostSummariesContainer from '../../containers/post_summaries_container.jsx';
import PostLink from '../post_link/post_link.jsx';

import './posts.scss';

function Posts(props) {

  if (!props) {
    return <Loader/>;
  }

  const list = props.posts.map((post, i) => <PostLink post={post} index={i}/>);

  return (
    <div className='posts'>
      <Hero title={props.title}/>
      <div className='posts__list'>
        {list}
      </div>
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default function(props) {
  return (
    <PostSummariesContainer slug={props.slug} activeTagName={props.activeTagName}>
      <Posts {...props}/>
    </PostSummariesContainer>
  );
}
