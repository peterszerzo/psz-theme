import React from 'react';

const containerStyle = {
  width: '100%',
  textAlign: 'center',
  paddingTop: '100px',
  height: '100vh'
};

const imageStyle = {
  display: 'inline-block',
  width: '60px',
  height: '60px'
};

export default function Loader(props) {
  return (
    <div style={containerStyle} className='loader'>
      <img style={imageStyle} src='/assets/images/loader/ripple.gif' alt='Loading icon'/>
    </div>
  );
}
