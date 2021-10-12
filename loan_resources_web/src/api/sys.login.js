import request from '@/plugin/axios'
import { baseUrl } from '@/api/baseUrl.js'

export function AccountLogin (data) {
  return request({
    url: baseUrl.ip1 + '/login',
    method: 'post',
    data
  })
}
