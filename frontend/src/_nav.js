import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cil3d,
  cilWindowMaximize,
  cilCarAlt,
  cilLan,
  cilSettings,
  cilAvTimer,
  cilGroup,
  cilUserX,
  cilUserFollow,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'



const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Scheduling',
  //   to: '/Schedules',
  //   icon: <CIcon icon={cilAvTimer} customClassName="nav-icon" />,
  // },
]

const _nav_footer = [
  // {
  //   component: CNavItem,
  //   name: 'Support',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Settings',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  // }
]

export default {nav:_nav, footer:_nav_footer}
