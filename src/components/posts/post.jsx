import React from 'react';
import marked from 'marked';

import Loader from '../loader/loader.jsx';
import Hero from '../hero/root.jsx';

import './post.scss';

import PostContainer from '../../containers/post_container.jsx';

function Post(props) {
  const {post} = props;
  if (!post) {
    return <Loader/>;
  }
  const {markdown, title, image, html} = post;
  const metaDescription = post.meta_description;
  const body = (markdown || html) ? <div className='static' dangerouslySetInnerHTML={{__html: html || marked(markdown)}}/> : null;
  return (
    <div>
      <Hero
        title={title}
        subtitle={metaDescription}
        image={image}
      />
      {body}
    </div>
  );
}

export default function(props, context) {
  let slug = props.slug || props.location.pathname;
  if (slug[0] === '/') {
    slug = slug.slice(1);
  }
  if (slug[slug.length - 1] === '/') {
    slug = slug.slice(0, -1);
  }
  return (
    <PostContainer slug={slug}>
      <Post/>
    </PostContainer>
  );
}
