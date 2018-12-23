export default (contacts, {text, sortBy}) => {
  return contacts.filter(contact => {
    const searchNameMatch = contact.name.toLowerCase().includes(text.toLowerCase());
    const searchEmailMatch = contact.email.toLowerCase().includes(text.toLowerCase());
    const searchPhoneMatch = contact.phone.toLowerCase().includes(text.toLowerCase());

    return searchNameMatch || searchEmailMatch || searchPhoneMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      case 'name_reverse':
        return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
      case 'email':
        return a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1;
      case 'email_reverse':
        return a.email.toLowerCase() < b.email.toLowerCase() ? 1 : -1;
      case 'phone':
        return a.phone > b.phone ? 1 : -1;
      case 'phone_reverse':
        return a.phone < b.phone ? 1 : -1;
      case 'debt':
        return a.debt > b.debt ? 1 : -1;
      case 'debt_reverse':
        return a.debt < b.debt ? 1 : -1;
      case 'notes':
        return a.notes > b.notes ? 1 : -1;
      case 'notes_reverse':
        return a.notes < b.notes ? 1 : -1;
    }
  })
};