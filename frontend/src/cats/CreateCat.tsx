import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Cat, CatError } from '../types'
import CatForm from './CatForm'
import { useHistory } from 'react-router-dom'

function CreateCat() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createCat = useMutation<Cat, CatError, Cat>(
    (values) => {
      return client.post('/api/v1/cats', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cats')
      },
    }
  )

  const handleSubmit = (values: Cat, { setSubmitting }: FormikHelpers<Cat>) => {
    createCat.mutate(values)
    setSubmitting?.(false)
    history.push('/cats')
  }

  return <CatForm onSubmit={handleSubmit} />
}

export default CreateCat
