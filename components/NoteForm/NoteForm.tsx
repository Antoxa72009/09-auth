"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./NoteForm.module.css";

interface NoteFormProps {
  initialValues?: {
    title: string;
    content: string;
  };
  onSubmit: (values: { title: string; content: string }) => void;
  submitText?: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),
  content: Yup.string()
    .required("Content is required")
    .max(1000, "Content must be at most 1000 characters"),
});

export default function NoteForm({
  initialValues = { title: "", content: "" },
  onSubmit,
  submitText = "Save",
}: NoteFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="Enter title" />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              placeholder="Enter content"
              rows={5}
            />
            <ErrorMessage
              name="content"
              component="div"
              className={styles.error}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : submitText}
          </button>
        </Form>
      )}
    </Formik>
  );
}