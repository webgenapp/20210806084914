import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Cat } from '../types'

function DetailCat() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Cat>(['cats', id], () =>
    client.get(`/api/v1/cats/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const cat = data as Cat

  return (
    <div>
      <label>{cat.name}</label>
      <br />
    </div>
  )
}

export default DetailCat
