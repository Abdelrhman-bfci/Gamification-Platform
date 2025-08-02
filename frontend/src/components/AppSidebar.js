import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'
import avatar8 from 'src/assets/images/avatars/2.jpg'

import {profile} from '../api/auth'


// sidebar nav config
import navigation from '../_nav'
import { cilArrowLeft, cilArrowRight } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const navigate = useNavigate();


  const [user , setUser] = useState({});

  const logout = ()=>{
    localStorage.removeItem('token')

    navigate('login')

  }

  const getProfile = async ()=> {
    const data = await profile();
    setUser(data);
  }

  // useEffect(() => {
  //   getProfile();
  // }, []);




  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        {/*<CSidebarBrand to="/">*/}
          <h3>Gamification</h3>
          {/*<CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />*/}
          {/* <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
        {/*</CSidebarBrand>*/}
        <CIcon  icon={ unfoldable ?  cilArrowRight : cilArrowLeft} height={28}   onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })} />
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation.nav}  className={'padding-20'}/>
      <AppSidebarNav items={navigation.footer} />
      {/*<CSidebarFooter className="border-top d-none d-lg-flex">*/}
      {/*  <div  className="d-flex sidebar-brand-full" >*/}
      {/*  <CAvatar src={avatar8} size="md" />*/}
      {/*  <div className={!unfoldable? 'font-size-9 mx-2': 'd-none'}>*/}
      {/*    <span className='d-block'> {user.Name}</span>*/}
      {/*    <span  className='d-block'>{user.Email}</span>*/}

      {/*  </div>*/}
      {/*  </div>*/}
      {/*  <CSidebarToggler*/}
      {/*    onClick={logout}*/}
      {/*  />*/}
      {/*</CSidebarFooter>*/}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
