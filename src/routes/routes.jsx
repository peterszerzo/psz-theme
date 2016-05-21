import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Layout from '../containers/layout.jsx';
import Welcome from '../components/welcome/welcome.jsx';
import About from '../components/about/about.jsx';
import Now from '../components/now/root.jsx';
import Posts from '../components/posts/posts.jsx';
import Post from '../components/post/post.jsx';

function ProjectPosts(props) {
  return <Posts slug='projects' activeTagName='project' title='Projects'/>;
}

function BlogPosts(props) {
  return <Posts slug='blog' activeTagName='blog' title='Blog'/>;
}

function DevBlogPosts(props) {
  return <Posts slug='devblog' activeTagName='devblog' title='Dev blog'/>;
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
