import React from 'react';
import {Link} from 'react-router-dom';

const ContactsList = () => (
  <header className="header-top navbar navbar-dark bg-dark">
    <h1 className="header-top-heading container-fluid">
      <Link to="/">Collector's contacts</Link>
    </h1>
  </header>
);

export default ContactsList;