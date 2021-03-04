/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-01 16:02:08
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-04 10:06:23
 */
import request from 'src/utils/request'

/**
 * 添加部门
 */
export function addDepartment(params) {
  return request.post('/department/add/', params)
}

/**
 * 获取部门列表
 */
export function getDepartmentList(params) {
  return request.post('/department/list/', params)
}

/**
 * 批量删除|删除 部门列表
 */
export function deleteDepartmentList(params) {
  return request.post('/department/delete/', params)
}

/**
 * 修改部门状态
 */
export function changeStatus(params) {
  return request.post('/department/status/', params)
}

/**
 * 获取部门详情
 */
export function getDepartmentDetail(params) {
  return request.post('/department/detailed/', params)
}

/**
 * 编辑部门详情
 */
export function editDepartment(params) {
  return request.post('/department/edit/', params)
}
