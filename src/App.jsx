import { useEffect, useState } from "react";
import contacts from "./data/contact.json";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

function App() {
  const localeContacts = () => {
    const savedContacts = localStorage.getItem("Contacts");
    return savedContacts ? JSON.parse(savedContacts) : contacts;
  };
  const [contact, setContact] = useState(localeContacts);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("Contacts", JSON.stringify(contact));
  }, [contact]);

  const addContact = (newContact) => {
    setContact((prevContact) => {
      return [...prevContact, newContact];
    });
  };
  const handleDelete = (contactId) => {
    setContact((prevContact) => {
      return prevContact.filter((contact) => contact.id !== contactId);
    });
  };
  const searchContact = contact.filter((cont) =>
    cont.name.toLowerCase().includes(filter.toLowerCase())
  );
  const changeFilter = (value) => {
    setFilter(value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div className="card">
        <ContactForm addContact={addContact} />
        <SearchBox changeFilter={changeFilter} filter={filter} />
      </div>
      <ContactList handleDelete={handleDelete} contact={searchContact} />
    </div>
  );
}

export default App;
