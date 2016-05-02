import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import classNames from 'classnames';

import Loader from '../loader/loader.jsx';
import Hero from '../hero/root.jsx';
import PostSummariesContainer from '../../containers/post_summaries_container.jsx';
import PostLink from '../post_link/post_link.jsx';

import './posts.scss';

function Posts(props) {

  if (!props) {
    return <Loader/>;
  }

  const list = props.posts.map((post, i) => {
    return <PostLink post={post} index={i}/>
    const publishDate = moment(post.published_at).format('MMMM YYYY');
    const viewUrl = `/${post.slug}`;
    const overlayClassName = classNames({
      'post__overlay': true,
      [`bg-c-${i % 10 + 1}`]: true
    });
    return (
      <Link key={i} className='post' to={viewUrl}>
        <div className='post__background' style={{backgroundImage: `url(${post.image})`}} />
        <div className={overlayClassName}/>
        <p className='post__date'>{publishDate}</p>
        <h1 className='post__title'>{post.title}</h1>
        <h2 className='post__subtitle'>{post.meta_description}</h2>
      </Link>
    );
  });

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
    <PostSummariesContainer activeTagName={props.activeTagName}>
      <Posts {...props}/>
    </PostSummariesContainer>
  );
}
