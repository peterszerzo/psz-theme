import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Layout from './../components/layout.jsx';
import Welcome from './../components/welcome/root.jsx';
import About from './../components/about/about.jsx';
import Now from './../components/now/root.jsx';
import Posts from './../components/posts/posts.jsx';
import Post from './../components/posts/post.jsx';

function ProjectPosts(props) {
  return <Posts activeTagName='project' title='Projects'/>;
}

function BlogPosts(props) {
  return <Posts activeTagName='blog' title='Blog'/>;
}

function DevBlogPosts(props) {
  return <Posts activeTagName='devblog' title='Dev blog'/>;
}

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Welcome}/>
    <Route path='/about' component={About}/>
    <Route path='/now' component={Now}/>
    <Route path='/projects' component={ProjectPosts}/>
    <Route path='/blog' component={BlogPosts}/>
    <Route path='/devblog' component={DevBlogPosts}/>
    <Route path='/:slug' component={Post}/>
  </Route>
);
