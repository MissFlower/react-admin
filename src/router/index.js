/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-23 10:27:55
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-21 16:18:43
 */
import { lazy } from 'react'
const path = require('path')
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
    path: '/401',
    component: lazy(() => import('src/views/ErrorPage/401')),
    hidden: true,
    meta: {
      title: '401'
    }
  },
  {
    path: '/404',
    component: lazy(() => import('src/views/ErrorPage/404')),
    hidden: true,
    meta: {
      title: '404'
    }
  },
  // 根路径要放到一层级路径最下面
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'index',
        component: lazy(() => import('src/views/Home')),
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
        component: lazy(() => import('src/views/User/userList')),
        meta: {
          title: '用户列表',
          icon: ''
        }
      },
      {
        path: '/user/add',
        component: lazy(() => import('src/views/User/addUser')),
        meta: {
          title: '添加用户',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/department',
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
        // ,
        // children: [
        //   {
        //     path: 'list1',
        //     component: lazy(() => import('@/views/Department/departmentList')),
        //     meta: {
        //       title: '部门列表',
        //       icon: ''
        //     }
        //   },
        //   {
        //     path: 'add1',
        //     component: lazy(() => import('src/views/Department/addDepartment')),
        //     meta: {
        //       title: '添加部门',
        //       icon: ''
        //     },
        //     children: [
        //       {
        //         path: 'list2',
        //         component: lazy(() => import('@/views/Department/departmentList')),
        //         meta: {
        //           title: '部门列表',
        //           icon: ''
        //         }
        //       },
        //       {
        //         path: 'add2',
        //         component: lazy(() => import('src/views/Department/addDepartment')),
        //         meta: {
        //           title: '添加部门',
        //           icon: ''
        //         },
        //         children: [
        //           {
        //             path: 'list3',
        //             component: lazy(() => import('@/views/Department/departmentList')),
        //             meta: {
        //               title: '部门列表',
        //               icon: ''
        //             }
        //           },
        //           {
        //             path: 'add3',
        //             component: lazy(() => import('src/views/Department/addDepartment')),
        //             meta: {
        //               title: '添加部门',
        //               icon: ''
        //             }
        //           }
        //         ]
        //       }
        //     ]
        //   }
        // ]
      }
    ]
  },
  {
    path: '/leave',
    component: MainLayout,
    children: [
      {
        path: '',
        component: lazy(() => import('src/views/Leave')),
        meta: {
          title: '请假',
          icon: 'PhoneOutlined'
        }
      }
    ]
  },
  {
    path: '/workovertime',
    component: MainLayout,
    children: [
      {
        path: '',
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
        path: 'department',
        component: lazy(() => import('src/views/Department/addDepartment')),
        activeMenu: '/department/add',
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

const createRouter = () => {
  // 初始化路由器配置
  const initRouter = (routes, parentPath = '') => {
    return routes.map((route, index) => {
      if (route.children?.length) {
        // 有子路由并且不是空
        route.children = initRouter(route.children, path.resolve(parentPath, route.path))
      } else {
        route = transfromRoute(route, parentPath)
      }
      return route
    })
  }

  // 改造路由
  const transfromRoute = (route, parentPath = '') => ({
    ...route,
    parentPath,
    fullPath: path.resolve(parentPath, route.path)
  })

  initRouter([...constantRouter, ...asyncRouter])
}

createRouter()
// console.log([...constantRouter, ...asyncRouter])
