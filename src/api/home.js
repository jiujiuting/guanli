import request from '@/utils/request'
export const usersApi = (params) => {
  return request({
    url: 'users',
    params
  })
}
