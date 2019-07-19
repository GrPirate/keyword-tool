import request from './index'

export const update = (name, total, params) => {
  return request.post(`/words/update`, { name, total, params })
}

export const getData = () => {
  return request.get('/words')
}
