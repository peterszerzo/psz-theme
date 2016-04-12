import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Falafel} from './../elements/icons.jsx';

function ModalNav(props) {

  const style = props.isExpanded ? {display: 'block'} : {display: 'none'};

  const list = props.buttons.map((button, i) => {
    const {url, name} = button;
    return (
      <li key={i} >
        <Link
          activeClassName='modal-nav__item--active'
          className='modal-nav__item'
          to={url}
          onClick={props.toggleExpandedState}
        >
          {name}
        </Link>
      </li>
    );
  });

  return (
    <div className='modal-nav' style={style}>
      <div className='close-button' onClick={props.toggleExpandedState}>
        <Falafel />
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
