import React from 'react'
import { cilWindowMaximize , cilTrash , cilPen} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { Col, Divider, Dropdown } from 'rsuite'


const VFLtable = ({data , columns}) => {
  return (
    <CRow>
        <CCol>
            <CCard className='mb-2'>
                <CCardBody>
                    <CRow className='d-flex justify-content-space-between px-3' style={{fontSize:'14px'}}>
                        {columns.map((el , key) =>{
                            return(<CCol md={el.w} key={key}>{el.name} </CCol>)
                        })}
                    </CRow>
                </CCardBody>
            </CCard>
            <CCard>
            <CCardBody>
                {data.map((el , key) =>{
                    return (
                     <div  key={key}>  
                       <CRow  className='d-flex justify-content-space-between px-2 align-items-center'>
                            <CCol xs={12} md={3}  className='d-flex  align-items-center hCol'>
                                {/* <CIcon icon={cilWindowMaximize} size='xl' className='mx-2' /> */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-3'>
                                <path d="M14.1 2.62207H4.875L3 4.57207V12.3721H1.2L0 13.5721V20.6221H2.325C2.7 22.1971 4.35 23.1721 5.925 22.7971C6.975 22.4971 7.8 21.6721 8.1 20.6221H9.825C10.2 22.1971 11.85 23.1721 13.425 22.7971C14.475 22.4971 15.3 21.6721 15.6 20.6221H18V15.8221L16.425 14.2471L14.1 2.62207ZM14.85 13.8721H10.8L9.75 12.8221V4.12207H12.9L14.85 13.8721ZM4.5 5.17207L5.55 4.12207H8.25V12.3721H4.5V5.17207ZM5.25 21.3721C4.425 21.3721 3.75 20.6971 3.75 19.8721C3.75 19.0471 4.425 18.3721 5.25 18.3721C6.075 18.3721 6.75 19.0471 6.75 19.8721C6.75 20.6971 6.075 21.3721 5.25 21.3721ZM12.75 21.3721C11.925 21.3721 11.25 20.6971 11.25 19.8721C11.25 19.0471 11.925 18.3721 12.75 18.3721C13.575 18.3721 14.25 19.0471 14.25 19.8721C14.25 20.6971 13.575 21.3721 12.75 21.3721ZM16.5 19.1221H15.675C15.3 17.5471 13.65 16.5721 12.075 16.9471C11.025 17.2471 10.2 18.0721 9.9 19.1221H8.175C7.8 17.5471 6.15 16.5721 4.575 16.9471C3.525 17.2471 2.7 18.0721 2.4 19.1221H1.5V14.1721L1.8 13.8721H8.7L10.2 15.3721H15.45L16.5 16.4221V19.1221Z" fill="black"/>
                                <path d="M21 1.12207H19.5V20.6221H24V19.1221H21V1.12207Z" fill="black"/>
                                </svg>

                                <div className='mx-1'>
                                <span className='d-block text-black'>{el.name}</span>
                                </div>

                            </CCol>
                            <CCol xs={12} md={2} className='hCol'>
                                {el.type}
                            </CCol>
                            <CCol xs={12} md={2}  className='d-flex hCol align-items-center'>
                                {el.warehouse}
                            </CCol>
                            <CCol xs={12} md={2}  className='d-flex hCol align-items-center'>
                            {el.phone_no}
                            </CCol>
                            <CCol xs={12} md={2} className='hCol'>
                                <Dropdown appearance="default" size='sm' title={'Busy'}>
                                    <Dropdown.Item>Inbounded</Dropdown.Item>
                                    <Dropdown.Item>Outbounded</Dropdown.Item>
                                </Dropdown>
                            </CCol>

                            <CCol xs={12} md={1} className='d-flex hCol justify-content-end'>
                            <CIcon icon={cilTrash}  />
                            <CIcon icon={cilPen}  className='mx-3' />
                            
                            </CCol>
                        </CRow>  
                        <Divider className='md'/>
                    </div> 
                    );
                })}
              
            </CCardBody>
            </CCard> 
        </CCol>
    </CRow>
  )
}

export default VFLtable;
