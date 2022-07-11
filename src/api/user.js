import request from '@/utils/request'
/**
 *
 * @param {登录} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({ // 登录
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}
