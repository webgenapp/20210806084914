import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import CatForm from './CatForm'
import { Cat } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateCat() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Cat>(['cats', id], () =>
    client.get(`/api/v1/cats/${id}`).then((response) => response.data)
  )

  const updateCat = useMutation<Cat, any, Cat>(
    (values: Cat) =>
      client
        .put(`/api/v1/cats/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cats')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const cat = data as Cat
  return (
    <CatForm
      cat={cat}
      onSubmit={(values, { setSubmitting }) => {
        updateCat.mutate(values)
        setSubmitting?.(false)
        history.push('/cats')
      }}
    />
  )
}

export default UpdateCat
