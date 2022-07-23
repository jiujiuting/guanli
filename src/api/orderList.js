import request from '@/utils/request'
/**
 *
 * @param {订单列表} param0
 * @returns
 */
export const TheOrderApi = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'orders',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
