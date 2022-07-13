import request from '@/utils/request'

// 获取城市列表数据
export const getCityList = (level) => {
  return request({
    // url: `/home/groups?area=${area}`
    url: `/area/city?level=${level}`
  })
}

// 获取热门城市
export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}

// 根据城市名称查询该城市信息
export const getCurrentCity = (name) => {
  return request({
    url: `/area/info?name=${name}`
  })
}
