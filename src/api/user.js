import request from '@/utils/request'

// 登录接口
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'user/login',
    data: {
      username,
      password
    }
  })
}

// 获取用户个人资料
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/user'
  })
}

// 查看收藏列表
export const getCollectList = () => {
  return request({
    url: '/user/favorites'
  })
}

// 房屋是否收藏
export const getFavorites = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}

// 添加收藏
export const addCollect = (id) => {
  return request({
    method: 'POST',
    url: `/user/favorites/${id}`
  })
}

// 删除收藏
export const delCollect = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/favorites/${id}`
  })
}
