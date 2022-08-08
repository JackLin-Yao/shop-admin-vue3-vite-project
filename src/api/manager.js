import service from '@/utils/server'
export function login(username, password) {
  // console.log('Hello')
  // console.log(username, password)
  let repose = service.post('/admin/login', {
    username,
    password,
  })
  // console.log('login请求发起')
  return repose
}
// export function login(username, password) {
//   return service.post('/admin/login', {
//     username,
//     password,
//   })
// }
export function getinfo() {
  // console.log('getinfo请求发起')
  return service.post('/admin/getinfo')
}

export function logout() {
  return service.post('/admin/logout')
}

export function updatepassword(data) {
  return service.post('/admin/updatepassword', data)
}
