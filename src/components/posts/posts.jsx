import React from 'react'
import {Link} from 'react-router'

import Loader from './../elements/loader.jsx'

function Index(props) {

  if (!props) {
    return <Loader />
  }

  const list = props.posts.map((post, i) => {
    const viewUrl = `/${post.slug}`
    return (
      <li key={i} className='post-grid__wrapper'>
        <Link className='post-grid__element' to={viewUrl}>
          <div className='post-grid__element__background' style={{backgroundImage: `url(${ post.image })`}} />
          <div className={ `post-grid__element__overlay bg-c-${ i % 5 + 1 }` } />
          <h1 className='post-grid__element__title'>{ post.title }</h1>
        </Link>
      </li>
    )
  })

  return (
    <ul className='post-grid'>
      { list }
    </ul>
  )
}

export default Index
