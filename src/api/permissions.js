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
/**
 *
 * @returns 角色列表
 */
export const TheRoleList = () => {
  return request({
    url: 'roles'
  })
}
/**
 *确认分配权限
 * @param {*} roleId
 * @param {*} rids
 * @returns
 */
export const AssignPermissions = (roleId, rids) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
/**
 *删除单个权限
 * @param {*} roleId
 * @param {*} rightId
 * @returns
 */
export const delPermissions = (roleId, rightId) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
