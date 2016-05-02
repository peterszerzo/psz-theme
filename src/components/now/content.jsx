import React from 'react';
import marked from 'marked';

import Loader from './../loader/loader.jsx';
import Hero from './../hero/root.jsx';

function NowContent(props) {
  const {post} = props;
  if (!post) {
    return <Loader/>;
  }
  const {html, title, markdown, image} = post;
  return (
    <div>
      <Hero
        title={title}
        image={image}
      />
      <div
        className='static'
        dangerouslySetInnerHTML={{__html: html || marked(markdown, {sanitize: true})}}
      />
    </div>
  );
}

NowContent.propTypes = {
  post: React.PropTypes.object
};

export default NowContent;
