import React from 'react';

const ContactsList = (props) => (
	<div className="search-contact">
		<input onChange={props.onTextChange} className="form-control rounded-0" type="text" placeholder="Search" aria-label="Search"/>
	</div>
);

export default ContactsList;