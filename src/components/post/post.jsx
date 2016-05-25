import React from 'react';

import Static from '../static/static.jsx';
import Loader from '../loader/loader.jsx';
import Hero from '../hero/hero.jsx';

import './post.scss';

import PostContainer from '../../containers/post_container.jsx';

function Post(props) {
  const {post} = props;
  if (!post) {
    return <Loader/>;
  }
  const {markdown, title, image, html} = post;
  const metaDescription = post.meta_description;
  return (
    <div>
      <Hero
        title={title}
        subtitle={metaDescription}
        image={image}
      />
      <Static markdown={markdown} html={html}/>
    </div>
  );
}

export default function(props) {
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
