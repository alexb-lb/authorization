export const setTextFilter = ((text = '') => ({type: 'SET_TEXT_FILTER', text}));

export const sortByName = (() => ({type: 'SORT_BY_NAME'}));
export const sortByNameReverse = (() => ({type: 'SORT_BY_NAME_REVERSE'}));

export const sortByEmail = (() => ({type: 'SORT_BY_EMAIL'}));
export const sortByEmailReverse= (() => ({type: 'SORT_BY_EMAIL_REVERSE'}));

export const sortByPhone = (() => ({type: 'SORT_BY_PHONE'}));
export const sortByPhoneReverse = (() => ({type: 'SORT_BY_PHONE_REVERSE'}));

export const sortByDebt = (() => ({type: 'SORT_BY_DEBT'}));
export const sortByDebtReverse = (() => ({type: 'SORT_BY_DEBT_REVERSE'}));

export const sortByNotes = (() => ({type: 'SORT_BY_STATUS'}));
export const sortByNotesReverse = (() => ({type: 'SORT_BY_STATUS_REVERSE'}));
