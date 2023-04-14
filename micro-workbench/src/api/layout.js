import request from '@/utils/request'
import url from './baseUrl'

const { api } = url

export function getLayout () {
  return request.get(`${api}/layout.json`)
}
