
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ContactsTitle, Container, FilterTitle, Title } from './App.styled';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { fetchAllContacts } from 'redux/contacts-operations';
import { selectContacts, selectIsLoading, selectError } from 'redux/selectors';


// export const getFilteredContacts = ({ contacts, filter }) => {
//   if (!filter) {
//       return contacts;
//   }
//   const normalizedFilter = filter.toLowerCase();
//   const result = contacts.contacts.filter(({ name }) => {
//       return (name.toLocaleLowerCase().includes(normalizedFilter))
//   })
//   return result;
// }

const App = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);


  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm />
      <ContactsTitle>Contacts</ContactsTitle>
      <FilterTitle>Find contacts by name</FilterTitle>
      <Filter />
      {isLoading && !error && <p>Loading...🚀</p>}
      {contacts.length ? (
        <ContactList />
      ) : (
        <p>No contacts yet</p>
      )}
    </Container>
  );
}

export default App;
