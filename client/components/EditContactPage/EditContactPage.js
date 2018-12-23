import React from 'react';
import {connect} from 'react-redux';

import ContactForm from '../ContactForm/ContactForm'
import {startEditContact, startRemoveContact} from '../../actions/contacts';


export class EditContactPage extends React.Component {
  onSubmit = (contact) => {
    this.props.startEditContact(this.props.contact.id, contact);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.startRemoveContact({id: this.props.contact.id});
    this.props.history.replace('/');
  };

  render() {
    return (
      <section className="page-edit-contact container">
        <h1 className="page-edit-contact__header">Edit contact</h1>
        <ContactForm
          contact={this.props.contact}
          onSubmit={this.onSubmit}
        />
        <button className="delete-contact-btn btn-danger rounded col-12" onClick={this.onRemove}>
          Remove Contact
        </button>
      </section>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    contact: state.contacts.find(contact => +contact.id === +props.match.params.id)
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditContact: (id, updates) => dispatch(startEditContact(id, updates)),
  startRemoveContact: (data) =>  dispatch(startRemoveContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContactPage);