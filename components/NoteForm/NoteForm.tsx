'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api/clientApi';
import styles from './NoteForm.module.css';
import type { NoteTag } from '@/types/note';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').max(100),
  content: Yup.string().required('Content is required').max(1000),
});

export default function NoteForm() {
  const router = useRouter();

  const handleSubmit = async (values: { title: string; content: string }) => {
    try {
      await createNote({
        title: values.title,
        content: values.content,
        tag: 'Work' as NoteTag, // за замовчуванням
      });

      router.push('/notes/filter/all');
    } catch (err) {
      console.error(err);
      alert('Failed to create note');
    }
  };

  return (
    <Formik
      initialValues={{ title: '', content: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="Enter title" />
            <ErrorMessage name="title" component="div" className={styles.error} />
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
            <ErrorMessage name="content" component="div" className={styles.error} />
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Create'}
          </button>
        </Form>
      )}
    </Formik>
  );
}