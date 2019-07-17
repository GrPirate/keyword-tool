import request from './index'

export const update = (name) => {
  return request.post(`/words/update`, { name })
}

export const getData = () => {
  return request.get('/words')
}
