import { deleteContact } from 'redux/contacts-operations';
import PropTypes from 'prop-types';
import ContactListItem from 'components/ContactListItem';
import { List } from './ContactList.styled';
import { selectContacts, selectFilter } from "../../redux/selectors";
import { useSelector, useDispatch } from 'react-redux';



function ContactList() {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();


  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = id => {
    dispatch(deleteContact(id))
  }

  return (
    <List>
      {filteredContacts.map(({ id, name, number }, idx) => (
        <ContactListItem
          onDelete={handleDeleteContact}
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
