import React from 'react';

import './loader.scss';

export default function Loader(props, context) {
  return (
    <div className='loader'>
      <img src='/images/loader/ripple.gif' />
    </div>
  );
}
