import axios from 'axios'
import ResponseMock from 'src/__moks__/ResponseMock'
import { ClientHttpRequest } from 'src/utils/httpService'

jest.mock('axios')

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(ResponseMock.data))
    const response = await ClientHttpRequest({
      urlBase: 'https://rickandmortyapi.com',
      path: '/api/character/',
      method: 'GET',
      withOutCredentials: true,
      message: {
        level: 'WARNING',
        onSuccess: 'Se completo el login correctamente',
      },
    })
    expect(response.response).toEqual(ResponseMock.data)
  })

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error'
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    )
  })
})
