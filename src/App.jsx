import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import { selectLoading, selectError } from "./redux/contactsSlice";

import ContactsForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Budnect</h1>
      <p className={styles.subtitle}>connect your buddies</p>
      <ContactsForm />
      <SearchBox />
      {loading && <p>Loading contacts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ContactList />
    </div>
  );
}

export default App;
