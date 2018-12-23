import axios from 'axios';

export const addContact = contact => ({type: 'ADD_CONTACT', contact});

export const startAddContact = (contactData = {}) => {
  return (dispatch, getState) => {

    const contact = (({name = '', email = '', phone = '', debt = 0, notes = ''}) => {
      return {name, email, phone, debt, notes}
    })(contactData);

    return axios.post('/contacts/add', contact)
      .then(response => {
        if(response.data.status !== 'OK'){
          throw response.data
        }
        return dispatch(addContact({id: response.data.contacts[0].id, ...contact}))
      })
      .catch(err => alert(err.message));
  };
};

export const removeContact = ({id} = {}) => ({type: 'DELETE_CONTACT', id});

export const startRemoveContact = ({id} = {}) => {
  return (dispatch, getState) => {

    return axios.post(`/contacts/${id}/delete`)
      .then(response => {
        if(response.data.status !== 'OK'){
          throw response.data
        }
        return dispatch(removeContact({id: response.data.contacts[0].id}));
      })
      .catch(err => alert(err.message));
  }
};

export const editContact = (id, updates = {}) => ({type: 'EDIT_CONTACT', id, updates});

export const startEditContact = (id, updates = {}) => {
  return (dispatch, getState) => {
    return axios.post(`/contacts/${id}/edit`, updates)
      .then(response => {
        if(response.data.status !== 'OK'){
          throw response.data
        }
        return dispatch(editContact(response.data.contacts[0].id, response.data.contacts[0]))
      })
      .catch(err => alert(err.message));
  }
};

export const setContacts = contacts => ({type: 'SET_CONTACTS', contacts});

export const startSetcontacts = () => {
  return (dispatch, getState) => {
    return axios.get('/contacts')
      .then(response => dispatch(setContacts(response.data.contacts)))
      .catch(err => alert(err.message));
  };
};


