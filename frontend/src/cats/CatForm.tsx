import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Cat } from '../types'

type CreateProps = {
  cat?: Cat
  onSubmit: (values: Cat, helpers: FormikHelpers<Cat>) => void
}

function CatForm({ cat, onSubmit }: CreateProps) {
  const initialValues: Cat = {
    name: cat ? cat.name : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='name' placeholder='Name' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default CatForm
