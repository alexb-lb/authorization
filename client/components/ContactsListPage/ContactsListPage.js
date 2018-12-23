import React from 'react';
import {connect} from 'react-redux';
import {
  setTextFilter,
  sortByName,
  sortByNameReverse,
  sortByEmail,
  sortByEmailReverse,
  sortByPhone,
  sortByPhoneReverse,
  sortByDebt,
  sortByDebtReverse,
  sortByNotes,
  sortByNotesReverse
} from '../../actions/filters';
import {startRemoveContact} from '../../actions/contacts';


import ContactListItem from '../ContactListItem/ContactListItem';
import AddContactButton from '../AddContactButton/AddContactButton';
import SearchContactsForm from '../SearchContactsForm/SearchContactsForm';

import SearchContacts from '../../selectors/sortContacts';

class ContactsListPage extends React.Component {

  state = {
    // capitalize filter from prop eg. "name" -> "Name"
    lastSortBy: this.props.filters.sortBy.charAt(0).toUpperCase() + this.props.filters.sortBy.slice(1),
    reverse: true
  };

  onSearch = e => this.props.setTextFilter(e.target.value);

  onSort = e => {
    const sortValue = e.target.getAttribute("data-sort-type");

    if (sortValue !== this.state.lastSortBy) {
      this.setState(() => ({reverse: true, lastSortBy: sortValue}));
      return this.props[`sortBy${sortValue}`]();
    }

    let func;
    if (this.state.reverse) {
      func = this.props[`sortBy${sortValue}Reverse`];
    } else {
      func = this.props[`sortBy${sortValue}`];
    }

    this.setState(state => ({reverse: !state.reverse}));
    return func();
  };

  onRemove = e => {
    const id = e.target.closest('.contact-list-item').getAttribute('data-contact-id');
    this.props.startRemoveContact({id});
  };

  render() {
    return (
      <section className="page-contacts-list">
        <nav className="row justify-content-between contacnt-list-nav m-0 p-0">
          <div className="col-md-10 align-self-end p-0">
            <SearchContactsForm
              value={this.props.filters.text}
              onTextChange={this.onSearch}
            />
          </div>
          <div className="col-md-2 align-self-start p-0">
            <AddContactButton/>
          </div>
        </nav>
        <div>
          {
            this.props.contacts.length === 0 ? (
              <div className="list-item__message col-md-3">
                <span>No contacts</span>
              </div>
            ) : (
              <table className="table table-sm table-hover table-striped">
                <thead className="thead-dark">
                <tr>
                  <th onClick={this.onSort} data-sort-type="Name" className="col-md-2" scope="col">Name</th>
                  <th onClick={this.onSort} data-sort-type="Email" className="col-md-2" scope="col">Email</th>
                  <th onClick={this.onSort} data-sort-type="Phone" className="col-md-2" scope="col">Phone</th>
                  <th onClick={this.onSort} data-sort-type="Debt" className="col-md-2" scope="col">Debt</th>
                  <th onClick={this.onSort} data-sort-type="Notes" className="col-md-2" scope="col">Notes</th>
                  <th className="col-md-2" scope="col">Delete</th>
                </tr>
                </thead>
                <tbody className="contacts-list-body">
                {
                  this.props.contacts.map(contact => {
                    return <ContactListItem key={contact.id} {...contact} onRemove={this.onRemove}/>
                  })
                }
                </tbody>
              </table>
            )
          }
        </div>
      </section>
    )
  }
};

const mapStateToProps = state => ({
  contacts: SearchContacts(state.contacts, state.filters),
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByName: () => dispatch(sortByName()),
  sortByNameReverse: () => dispatch(sortByNameReverse()),
  sortByEmail: () => dispatch(sortByEmail()),
  sortByEmailReverse: () => dispatch(sortByEmailReverse()),
  sortByPhone: () => dispatch(sortByPhone()),
  sortByPhoneReverse: () => dispatch(sortByPhoneReverse()),
  sortByDebt: () => dispatch(sortByDebt()),
  sortByDebtReverse: () => dispatch(sortByDebtReverse()),
  sortByNotes: () => dispatch(sortByNotes()),
  sortByNotesReverse: () => dispatch(sortByNotesReverse()),
  startRemoveContact: data =>  dispatch(startRemoveContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListPage);