
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ContactsTitle, Container, FilterTitle, Title } from './App.styled';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { getAllCons } from 'redux/contacts/contacts-selector';


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
  const contacts = useSelector(getAllCons);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm/>
        <ContactsTitle>Contacts</ContactsTitle>
        <FilterTitle>Find contacts by name</FilterTitle>
        <Filter/>
        {contacts.length ? (
          <ContactList/>
        ) : (
          <p>No contacts yet</p>
        )}
      </Container>
  );
}

export default App;
