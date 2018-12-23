const contactsReducerDefaultState = [];

export default (state = contactsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return [...state, action.contact];
    case 'DELETE_CONTACT':
      return state.filter(({id}) => +id !== +action.id);
    case 'EDIT_CONTACT':
      return state.map((contact, i, arr) => {
        if (action.id === contact.id) {
          return {...contact, ...action.updates};
        } else {
          return contact;
        }
      });
    case 'SET_CONTACTS':
      return action.contacts;
    default:
      return state;
  }
};