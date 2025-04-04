import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import styles from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles.contact}>
      <p className={styles.name}>{name}</p>
      <p className={styles.number}>{number}</p>
      <button onClick={handleDelete} className={styles.button}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
