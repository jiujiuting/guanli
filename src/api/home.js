import request from '@/utils/request'
/**
 *
 * @param {获取用户数据} params
 * @returns
 */
export const usersApi = (params) => {
  return request({
    url: 'users',
    params
  })
}
/**
 *
 * @param {添加用户} param0
 * @returns
 */
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}
/**
 *
 * @param {更改状态} param0
 * @returns
 */
export const changeThe = ({ uld, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uld}/state/${type}`
  })
}
/**
 *
 * @param {编辑功能获取用户数据} id
 * @returns
 */
export const editData = (id) => {
  return request({
    method: 'GET',
    url: `users/${id}`
  })
}
/**
 *
 * @param {确认编辑} param0
 * @returns
 */
export const editingFeatures = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      email,
      mobile
    }
  })
}
/**
 *
 * @param {删除} id
 * @returns
 */
export const deleteApi = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}
/**
 *
 * @returns 分配角色-角色列表
 */
export const roleListApi = () => {
  return request({
    url: 'roles'
  })
}
export const roleDetermine = (id, rid) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}
