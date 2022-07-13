import request from '@/utils/request'

// 获取轮播图接口
export const getViewpager = () => {
  return request({
    method: 'GET',
    url: '/home/swiper'
  })
}

// 租房小组接口
export const getRentHome = (area) => {
  return request({
    url: `/home/groups?area=${area}`
  })
}
