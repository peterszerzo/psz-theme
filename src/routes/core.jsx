import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Layout from './../components/layout.jsx'
import Welcome from './../components/welcome/root.jsx'
import About from './../components/about/root.jsx'
import Now from './../components/now/root.jsx'
import Index from './../components/posts/index.jsx'
import Show from './../components/posts/show.jsx'

function ProjectsIndex(props) {
  return <Index activeTagName='project'/>
}

function BlogIndex(props) {
  return <Index activeTagName='blog'/>
}

function DevBlogIndex(props) {
  return <Index activeTagName='devblog'/>
}

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Welcome}/>
    <Route path='/about' component={About}/>
    <Route path='/now' component={Now}/>
    <Route path='/projects' component={ProjectsIndex}/>
    <Route path='/blog' component={BlogIndex}/>
    <Route path='/devblog' component={DevBlogIndex}/>
    <Route path='/:slug' component={Show}/>
  </Route>
)
