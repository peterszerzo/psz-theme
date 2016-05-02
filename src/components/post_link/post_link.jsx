import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {Link} from 'react-router';

import './post_link.scss';

export default function PostLink(props) {
  const {post, index} = props;
  const publishDate = moment(post.published_at).format('MMMM YYYY');
  const viewUrl = `/${post.slug}`;
  const overlayClassName = classNames('post-link__overlay', `bg-c-${index % 10 + 1}`);
  return (
    <Link key={index} className='post-link' to={viewUrl}>
      <div className='post-link__background' style={{backgroundImage: `url(${post.image})`}} />
      <div className={overlayClassName}/>
      <p className='post-link__date'>{publishDate}</p>
      <h1 className='post-link__title'>{post.title}</h1>
      <h2 className='post-link__subtitle'>{post.meta_description}</h2>
    </Link>
  );
}
