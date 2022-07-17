import request from '@/utils/request'
/**
 *
 * @param {权限列表} type
 * @returns
 */
export const permissionsList = (type) => {
  return request({
    url: `rights/${type}`
  })
}
export const TheRoleList = () => {
  return request({
    url: 'roles'
  })
}
