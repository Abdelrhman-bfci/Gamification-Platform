import React, { useEffect, useState } from 'react'
import { cilPlus, cilArrowLeft, cilArrowRight, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { DateRangePicker , Divider, Message, useToaster} from 'rsuite';
import UCrad from './UCrad';
import { getForkliftList , deleteForklift } from '../../api/forklift'



import {
  CCard,
  CCardBody,
  CButton,
  CFormInput,
  CCol,
  CRow,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom';

const Table = ({columns , name}) => {

  const [list, setlist] = useState([]);
  const [pages, setpages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const toaster = useToaster();
  const navigate = useNavigate();

  const message = (
    <Message showIcon type='success' closable>
      item deleted successful
    </Message>
  );

  const deleteById = async (id) =>{
    const data = await deleteForklift(id); 
    getForklifts();
    toaster.push(message, {placement:'topEnd',  duration:1000})
  }


  const getForklifts = async (page = 1) => {
    const data = await getForkliftList(page, 10); // Call API with the selected page
    setlist(data.forklifts);
    setpages(data.pages);
    setActivePage(page); // Update active page
  }

  useEffect(() => {
    getForklifts();
  }, []);


  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardBody>

          <CRow className='mb-3'>
            <CCol xs={12} className='d-flex justify-content-between'>
            <h3 className='card-title'>Users</h3>
              <CButton type="submit" color="primary" onClick={()=>{navigate('/Forklifts/save')}}>
              <CIcon icon={cilPlus} className="me-2" />
               New User
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
            <CRow className='d-flex justify-content-space-between px-3' style={{fontSize:'14px'}}>
              {columns.map((el , key) =>{
                return(<CCol md={el.w} key={key}>{el.name} </CCol>)
              })}
            </CRow>
            <Divider  className='md' />

          </CRow>

          <CRow className='mt-2'>
            <CCol sm={12}>
              <CCard style={{fontSize:'14px'}}>
              {list.map((el, key) => {
                    return (<div key={key}> <UCrad data={{ id:el._id , name: el.name,warehouse:'' , phone_no:el.phonenumber , status:el.status}} onDelete={deleteById} />
                      <Divider className='md' /></div>)
                  })}
                {/* <FCrad data={{name:'Forklift Name' , type:'Forklift Type' , warehouse:'Warehouse Name' , phone_no:'+966-505-551-373'}}/>
                <Divider  className='md' />
                <FCrad data={{name:'Forklift Name' , type:'Forklift Type' , warehouse:'Warehouse Name' , phone_no:'+966-505-551-373'}}/>
                <Divider  className='md' />
                <FCrad data={{name:'Forklift Name' , type:'Forklift Type' , warehouse:'Warehouse Name' , phone_no:'+966-505-551-373'}}/>
                <Divider  className='md' />
                <FCrad data={{name:'Forklift Name' , type:'Forklift Type' , warehouse:'Warehouse Name' , phone_no:'+966-505-551-373'}}/>
                <Divider  className='md' />
                <FCrad data={{name:'Forklift Name' , type:'Forklift Type' , warehouse:'Warehouse Name' , phone_no:'+966-505-551-373'}}/> */}
              </CCard>
            </CCol>
          </CRow>
          </CCardBody>
          <Divider className='my-1 md'/>
          <CRow>
            <CCol md={12} className='d-flex py-2' style={{justifyContent: 'space-between'}}>
              <div   onClick={() => activePage > 1 && getDocks(activePage - 1)}
                style={{ cursor: 'pointer' }}>
                <CIcon icon={cilArrowLeft} className='mx-2'></CIcon>
                Previous
              </div>

              <div className='pagnation'>

              {
                  [...Array(pages)].map((_, key) => {
                    const pageNumber = key + 1;
                    return (
                      <span
                        key={key}
                        className={activePage === pageNumber ? 'page active-page' : 'page'}
                        onClick={() => getDocks(pageNumber)} // Fetch data for clicked page
                        style={{ cursor: 'pointer' }}
                      >
                        {pageNumber}
                      </span>
                    )
                  })
                }
              </div>

              <div     onClick={() => activePage < pages && getDocks(activePage + 1)}
                style={{ cursor: 'pointer' }}>
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

export default Table
