import React from 'react';
import {Link} from 'react-router-dom';

const AddContactButton = () => (
  <button className="btn btn-success btn-add-contact rounded-0">
    <Link to={'/add'}>
      <svg viewBox="0 0 24 24">
        <path d="M18,10h-4V6c0-1.104-0.896-2-2-2s-2,0.896-2,2l0.071,4H6c-1.104,0-2,0.896-2,2s0.896,2,2,2l4.071-0.071L10,18  c0,1.104,0.896,2,2,2s2-0.896,2-2v-4.071L18,14c1.104,0,2-0.896,2-2S19.104,10,18,10z"/>
      </svg>
    </Link>
  </button>
);

export default AddContactButton;