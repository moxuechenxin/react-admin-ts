import axios from 'axios'

export default ({url, type, timeout = 15000, headers, data, params}) => {
  return axios({
    url: `/api${url}`,
    timeout: timeout,
    method: type || 'get',
    headers: headers,
    data: data,
    params: params
  })
  .then((response) => {
    return response.data
  })
  .catch((err) => {
    throw err
  })
}