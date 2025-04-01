import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import s from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={s.contact}>
      <p className={s.title}>{name}</p>
      <p className={s.telefon}>{number}</p>
      <button type="button" className={s.button} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
