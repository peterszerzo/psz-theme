import React, {PropTypes} from 'react';

import './modal_nav.scss';
import {Falafel} from '../icons/icons.jsx';

function ModalNav(props) {

  const style = props.isExpanded ? {display: 'block'} : {display: 'none'};

  const list = props.buttons.map((button, i) => {
    const {url, name} = button;
    return (
      <li key={i} >
        <a
          activeClassName='modal-nav__item--active'
          className='modal-nav__item'
          href={url}
          onClick={props.toggleExpandedState}
        >
          {name}
        </a>
      </li>
    );
  });

  return (
    <div className='modal-nav' style={style}>
      <div className='close-button' onClick={props.toggleExpandedState}>
        <Falafel/>
      </div>
      <ul className='modal-nav__items'>
        {list}
      </ul>
    </div>
  );
}

ModalNav.propTypes = {
  buttons: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool.isRequired
};

export default ModalNav;
