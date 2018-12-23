import React from 'react';
import {Link} from 'react-router-dom';

const contactListItem = ({id, name, email, phone, debt, notes, onRemove}) => (
  <tr className="contact-list-item" data-contact-id={id}>
    <td className="col-md-2 contact-list-item-field" scope="row">
      <Link to={`/edit/${id}`}>
        {name}
      </Link>
    </td>
    <td className="col-md-2 contact-list-item-field">
      <Link to={`/edit/${id}`}>
        {email}
      </Link>
    </td>
    <td className="col-md-2 contact-list-item-field">
      <Link to={`/edit/${id}`}>
        {phone}
      </Link>
    </td>
    <td className="col-md-2 contact-list-item-field">
      <Link to={`/edit/${id}`}>
        {debt}
      </Link>
    </td>
    <td className="col-md-2 contact-list-item-field">
      <Link to={`/edit/${id}`}>
        {notes}
      </Link>
    </td>
    <td className="col-md-2">
      <button onClick={onRemove} className="btn btn-danger btn-delete-contact">
        <svg viewBox="0 0 32 32">
          <path
            d="M20.377,16.519l6.567-6.566c0.962-0.963,0.962-2.539,0-3.502l-0.876-0.875c-0.963-0.964-2.539-0.964-3.501,0  L16,12.142L9.433,5.575c-0.962-0.963-2.538-0.963-3.501,0L5.056,6.45c-0.962,0.963-0.962,2.539,0,3.502l6.566,6.566l-6.566,6.567  c-0.962,0.963-0.962,2.538,0,3.501l0.876,0.876c0.963,0.963,2.539,0.963,3.501,0L16,20.896l6.567,6.566  c0.962,0.963,2.538,0.963,3.501,0l0.876-0.876c0.962-0.963,0.962-2.538,0-3.501L20.377,16.519z"
            fill="#515151"/>
        </svg>
      </button>
    </td>
  </tr>
);

export default contactListItem;