import service from '@/utils/server'

//获取图片列表
export function getImageList(id, page = 1) {
  return service.get(`/admin/image_class/${id}/image/${page}`)
}

//
export function updateImage(id, name) {
  return service.post(`/admin/image/${id}`, { name })
}

// 删除图片
export function deleteImage(ids) {
  return service.post(`/admin/image/delete_all`, { ids })
}

// 上传图片
export const uploadImageAction = '/api/admin/image/upload'
