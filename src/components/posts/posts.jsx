import React, {PropTypes} from 'react';

import Loader from '../loader/loader.jsx';
import Hero from '../hero/hero.jsx';
import PostSummariesContainer from '../../containers/post_summaries_container.jsx';
import PostLink from '../post_link/post_link.jsx';

import './posts.scss';

function Posts({post, posts}) {

  if (!post || !posts) {
    return <Loader/>;
  }

  const list = posts.map((post, i) => <PostLink key={i} post={post} index={i}/>);

  return (
    <div className='posts'>
      <Hero
        title={post.title}
        image={post.image}
      />
      <div className='posts__list'>
        {list}
      </div>
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.array
};

export default function(props) {
  return (
    <PostSummariesContainer slug={props.slug} activeTagName={props.activeTagName}>
      <Posts {...props}/>
    </PostSummariesContainer>
  );
}
