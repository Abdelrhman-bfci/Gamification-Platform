import React from 'react'
import { cilPlus, cilFilter, cilArrowLeft, cilArrowRight, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Col, DateRangePicker , Divider} from 'rsuite';
import FCrad from '../facilities/FCrad';
// import 'rsuite/DateRangePicker/styles/index.css';



import {
  CCard,
  CCardBody,
  CButton,
  CFormInput,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

const DataTable = ({columns , name}) => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardBody>

          <CRow className='mb-3'>
            <CCol xs={12} className='d-flex justify-content-between'>
            <h3 className='card-title'>Facilities</h3>
              <CButton type="submit" color="primary">
              <CIcon icon={cilPlus} className="me-2" />
               New Facility
              </CButton>
            </CCol>
          </CRow>

          <CRow className='my-2'>
          <CCol lg={6} xs={12} className='d-flex'>
              <CInputGroup className="w-50" >
                      <CInputGroupText>
                        <CIcon icon={cilSearch} />
                      </CInputGroupText>
                      <CFormInput type="text"  placeholder="search" />
               </CInputGroup>
            </CCol>
            <CCol lg={6} xs={12} className='d-flex justify-content-end'>
            <DateRangePicker size='md' format='MMM dd,yyyy' character=' - '  className='me-2' placement='bottomEnd'/>
            <CButton className='btn-filter'> 
              {/* <CIcon icon={cilFilter} /> */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-2'>
              <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              filter

              </CButton>
            </CCol>
          </CRow>

          <CRow>
          <Divider className='md' />
            <CRow className='d-flex justify-content-space-between px-3'>
              {columns.map((el , key) =>{
                return(<CCol md={el.w} key={key}>{el.name} </CCol>)
              })}
            </CRow>
            <Divider  className='md' />

          </CRow>

          <CRow className='mt-2'>
            <CCol sm={12}>
              <CCard>
                <FCrad data={{name:'Warehouse Name' , type:'Type' , location:'3581 1 Al Bustan Dist Al Khobar 34422 add' , dockes:3 , forklift:4}}/>
                <Divider  className='md' />
                <FCrad data={{name:'Warehouse Name' , type:'Type' , location:'3581 1 Al Bustan Dist Al Khobar 34422 add' , dockes:3 , forklift:4}}/>
                <Divider  className='md' />
                <FCrad data={{name:'Warehouse Name' , type:'Type' , location:'3581 1 Al Bustan Dist Al Khobar 34422 add' , dockes:3 , forklift:4}}/>
                <Divider  className='md' />
                <FCrad data={{name:'Warehouse Name' , type:'Type' , location:'3581 1 Al Bustan Dist Al Khobar 34422 add' , dockes:3 , forklift:4}}/>
                <Divider  className='md' />
                <FCrad data={{name:'Warehouse Name' , type:'Type' , location:'3581 1 Al Bustan Dist Al Khobar 34422 add' , dockes:3 , forklift:4}}/>
                
              </CCard>
            </CCol>
          </CRow>
          </CCardBody>
          <Divider className='my-1 md'/>
          <CRow>
            <CCol md={12} className='d-flex py-2' style={{justifyContent: 'space-between'}}>
              <div >
                <CIcon icon={cilArrowLeft} className='mx-2'></CIcon>
                Previous
              </div>

              <div className='pagnation'>

                {
                  [...Array(10)].map((el , key)=>{
                    return (<span className={key == 0 ? 'page active-page' : 'page' } key={key}>{key+1}</span>)
                  })
                }
              </div>

              <div>
                Next
                <CIcon icon={cilArrowRight} className='mx-2'></CIcon>
              </div>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DataTable
