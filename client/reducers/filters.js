const filtersReducerDefaultState = {
  text: '',
  sortBy: 'name',
};

export default  (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {...state, text: action.text};
    case 'SORT_BY_NAME':
      return {...state, sortBy: 'name'};
    case 'SORT_BY_NAME_REVERSE':
      return {...state, sortBy: 'name_reverse'};
    case 'SORT_BY_EMAIL':
      return {...state, sortBy: 'email'};
    case 'SORT_BY_EMAIL_REVERSE':
      return {...state, sortBy: 'email_reverse'};
    case 'SORT_BY_PHONE':
      return {...state, sortBy: 'phone'};
    case 'SORT_BY_PHONE_REVERSE':
      return {...state, sortBy: 'phone_reverse'};
    case 'SORT_BY_DEBT':
      return {...state, sortBy: 'debt'};
    case 'SORT_BY_DEBT_REVERSE':
      return {...state, sortBy: 'debt_reverse'};
    case 'SORT_BY_STATUS':
      return {...state, sortBy: 'notes'};
    case 'SORT_BY_STATUS_REVERSE':
      return {...state, sortBy: 'notes_reverse'};
    default:
      return state;
  }
};
