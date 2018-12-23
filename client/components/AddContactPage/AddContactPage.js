import React from 'react';
import {connect} from 'react-redux';
import ContactForm from '../ContactForm/ContactForm';
import {startAddContact} from '../../actions/contacts';

export class AddContactPage extends React.Component {

  onSubmit = contact => {
    this.props.startAddContact(contact);
    this.props.history.push('/');
  };

  render() {
    return (
      <section className="page-add-contact container">
        <h1 className="page-add-contact__header">Add contact</h1>
        <ContactForm onSubmit={this.onSubmit}/>
      </section>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  startAddContact: contact => dispatch(startAddContact(contact))
});

export default connect(undefined, mapDispatchToProps)(AddContactPage);