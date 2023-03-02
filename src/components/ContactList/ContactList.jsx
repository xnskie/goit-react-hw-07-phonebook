import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from 'components/ContactListItem';
import { List } from './ContactList.styled';
// import { getAllCons } from 'redux/contacts/contacts-selector';
import { deleteContact } from 'redux/contacts/contacts-slice';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/filter/filter-selectors';
import { getAllCons } from 'redux/contacts/contacts-selector';



function ContactList() {
  const contacts = useSelector(getAllCons);
  console.log(contacts.map(con => con.name))
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  return (
    <List>
      {filteredContacts.map(({ id, name, number }, idx) => (
        <ContactListItem
          onDelete={() => dispatch(deleteContact({ id }))}
          name={name}
          number={number}
          id={id}
          key={id}
          idx={idx}
        />
      ))}
    </List>
  );
}




export default ContactList;

ContactList.propeTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })),
  onDelete: PropTypes.func,
};
