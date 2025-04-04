import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { selectContacts } from "../../redux/contactsSlice";
import styles from "./ContactForm.module.css";

const ContactsForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too short")
      .max(50, "Name is too long")
      .required("Required field"),
    number: Yup.string()
      .min(7, "Number is too short")
      .max(15, "Number is too long")
      .matches(/^\+?[0-9-()\s]*$/, "Invalid phone number format")
      .required("Required field"),
  });

  const handleSubmit = (
    values,
    { resetForm, setSubmitting, setFieldError }
  ) => {
    const duplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (duplicate) {
      setFieldError("name", "Contact with this name already exists");
      setSubmitting(false);
      return;
    }

    dispatch(addContact(values))
      .unwrap()
      .then(() => resetForm())
      .catch((error) => {
        console.error("Failed to add contact:", error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Name:
            <Field type="text" name="name" className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </label>
          <label className={styles.label}>
            Number:
            <Field type="text" name="number" className={styles.input} />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </label>
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactsForm;
