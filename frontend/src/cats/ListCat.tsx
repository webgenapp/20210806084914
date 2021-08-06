import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Cat } from '../types'
import { useHistory } from 'react-router-dom'

type CatPreviewProps = {
  cat: Cat
  handleEdit: (cat: Cat) => void
  handleDelete: (cat: Cat) => void
  handleDetail: (cat: Cat) => void
}

function CatPreview({
  cat,
  handleEdit,
  handleDelete,
  handleDetail,
}: CatPreviewProps) {
  return (
    <>
      {cat.name}
      <br />
      <button type='button' onClick={() => handleDetail(cat)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(cat)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(cat)}>
        delete
      </button>
    </>
  )
}

function ListCats() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const catsQuery = useQuery<Cat[]>('cats', () => {
    return client
      .get('/api/v1/cats')
      .then((response) => response.data) as Promise<Cat[]>
  })

  const deleteCat = useMutation<any, any, Partial<Cat>>(
    ({ id }) => {
      return client.delete(`/api/v1/cats/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cats')
      },
    }
  )

  const handleEdit = ({ id }: Cat) => {
    history.push(`/cats/update/${id}`)
  }

  const handleDelete = ({ id }: Cat) => {
    deleteCat.mutate({ id })
  }

  const handleDetail = ({ id }: Cat) => {
    history.push(`/cats/detail/${id}`)
  }

  return (
    <>
      <p>{catsQuery.data?.length} cats</p>
      <ul>
        {catsQuery.data?.map((cat) => (
          <li key={cat.id}>
            <CatPreview
              cat={cat}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListCats
