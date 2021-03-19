/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 10:27:55
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-19 11:26:28
 */
import { lazy } from 'react'
// Layout
// import MainLayout from 'src/layout/MainLayout'
const MainLayout = lazy(() => import('src/layout/MainLayout'))

export const constantRouter = [
  {
    path: '/login',
    component: lazy(() => import('src/views/Login')),
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/app',
    component: MainLayout,
    children: [
      {
        path: '/app/index',
        component: lazy(() => import('src/views/Home')),
        meta: {
          title: 'Home',
          icon: 'HomeOutlined'
        }
      }
    ]
  },
  {
    path: '/401',
    component: lazy(() => import('src/views/ErrorPage/401')),
    hidden: true,
    meta: {
      title: '401'
    }
  }
]

export const asyncRouter = [
  {
    path: '/app/user',
    component: MainLayout,
    meta: {
      title: '用户管理',
      icon: 'UserOutlined'
    },
    children: [
      {
        path: '/app/user/list',
        component: lazy(() => import('src/views/User/userList')),
        meta: {
          title: '用户列表',
          icon: ''
        }
      },
      {
        path: '/app/user/add',
        component: lazy(() => import('src/views/User/addUser')),
        meta: {
          title: '添加用户',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/app/department',
    component: MainLayout,
    redirect: '',
    meta: {
      title: '部门管理',
      icon: 'TeamOutlined'
    },
    children: [
      {
        path: 'list',
        component: lazy(() => import('@/views/Department/departmentList')),
        meta: {
          title: '部门列表',
          icon: ''
        }
      },
      {
        path: 'add',
        component: lazy(() => import('src/views/Department/addDepartment')),
        meta: {
          title: '添加部门',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/app/leave',
    component: MainLayout,
    children: [
      {
        path: '/app/leave',
        component: lazy(() => import('src/views/Leave')),
        meta: {
          title: '请假',
          icon: 'PhoneOutlined'
        }
      }
    ]
  },
  {
    path: '/app/workovertime',
    component: MainLayout,
    children: [
      {
        path: '/app/workovertime',
        component: lazy(() => import('src/views/WorkOverTime')),
        meta: {
          title: '加班',
          icon: 'FileAddOutlined'
        }
      }
    ]
  },
  // {
  //   path: 'https://www.baidu.com',
  //   meta: {
  //     title: '百度',
  //     icon: 'FileAddOutlined'
  //   }
  // },
  // 编辑
  {
    path: '/edit',
    component: MainLayout,
    hidden: true,
    children: [
      {
        path: '/app/department/edit',
        component: lazy(() => import('src/views/Department/addDepartment')),
        activeMenu: '/app/department/add',
        meta: {
          title: '编辑部门',
          icon: ''
        }
      }
    ]
  },
  {
    path: '*',
    component: lazy(() => import('src/views/ErrorPage/404')),
    hidden: true,
    meta: {
      title: '404'
    }
  }
]
