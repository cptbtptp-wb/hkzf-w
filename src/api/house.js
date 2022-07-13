import request from '@/utils/request'

// 根据城市id获取房源数据
export const getHouseItem = (cityId) => {
  return request({
    url: '/houses',
    params: {
      cityId
    }
  })
}

// 查询房屋具体信息（id）
export const getHouseInfo = id => {
  return request({
    url: `/houses/${id}`
  })
}

// 发布房屋所需条件
export const getHouseTerm = () => {
  return request({
    url: 'houses/params'
  })
}

// 获取房屋查询条件
export const getHouseCondition = (id) => {
  return request({
    url: `houses/condition?id=${id}`
  })
}

// 获取 get   参数：params
// 修改 post  参数：data
// 删除 delete  参数：params
// 修改 put（完全覆盖） patch（部分覆盖）  参数：data
