/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 10:27:55
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-23 17:45:54
 */
import React from 'react'
// Layout
import MainLayout from 'src/layout/MainLayout'
console.log(MainLayout)

export const constantRouter = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/index',
        component: () => import('src/views/Home'),
        meta: {
          title: 'Home',
          icon: 'HomeOutlined'
        }
      }
    ]
  }
]

export const asyncRouter = [
  {
    path: '/user',
    component: MainLayout,
    meta: {
      title: '用户管理',
      icon: 'UserOutlined'
    },
    children: [
      {
        path: '/user/list',
        component: () => import('src/views/User/userList'),
        meta: {
          title: '用户列表',
          icon: ''
        }
      },
      {
        path: '/user/add',
        component: () => import('src/views/User/addUser'),
        meta: {
          title: '添加用户',
          icon: ''
        },
        children: [
          {
            path: '/department/list1',
            component: () => import('src/views/Department/departmentList'),
            meta: {
              title: '部门列表',
              icon: ''
            }
          },
          {
            path: '/department/add1',
            component: () => import('src/views/Department/addDepartment'),
            meta: {
              title: '添加部门',
              icon: ''
            }
          }
        ]
      }
    ]
  },
  {
    path: '/department',
    component: MainLayout,
    meta: {
      title: '部门管理',
      icon: 'TeamOutlined'
    },
    children: [
      {
        path: '/department/list',
        component: () => import('src/views/Department/departmentList'),
        meta: {
          title: '部门列表',
          icon: ''
        }
      },
      {
        path: '/department/add',
        component: () => import('src/views/Department/addDepartment'),
        meta: {
          title: '添加部门',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/leave',
    component: MainLayout,
    meta: {
      title: '请假',
      icon: 'PhoneOutlined'
    }
  },
  {
    path: '/workovertime',
    component: MainLayout,
    meta: {
      title: '加班',
      icon: 'FileAddOutlined'
    }
  }
]
