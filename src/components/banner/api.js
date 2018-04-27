import fetchApi from '@/utils/fetchApi'

// 获取表格接口
const GET_BANNER_URL = '/banner'

export const getBannerApi = (params) => {
    return fetchApi({
      url: GET_BANNER_URL,
      type: 'get',
      params
    })
  }

// 删除数据
export const deleteBannerApi = (data) => {
  return fetchApi({
    url: GET_BANNER_URL,
    type: 'DELETE',
    data
  })
}

// 新增数据
export const addBannerApi = (data) => {
  return fetchApi({
    url: GET_BANNER_URL,
    type: 'post',
    data
  })
}

// 编辑数据
export const updateBannerApi = (data) => {
  return fetchApi({
    url: GET_BANNER_URL,
    type: 'put',
    data
  })
}

// 上传文件
const UPLOAD_FILS_URL = '/file'
export const uploadFilsApi = (data) => {
  return fetchApi({ 
    url: UPLOAD_FILS_URL,
    type: 'post',
    data
  })
}