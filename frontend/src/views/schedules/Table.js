import React, { useEffect, useState } from 'react'
import { cilPlus, cilFilter, cilArrowLeft, cilArrowRight, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Button, ButtonToolbar, Checkbox, Input, DateRangePicker , Divider, Drawer, Dropdown, InputGroup, Message, useToaster} from 'rsuite';
import FCrad from './FCrad';
import CloseIcon from '@rsuite/icons/Close';
import SearchIcon from '@rsuite/icons/Search';


import {
  CCard,
  CCardBody,
  CButton,
  CFormInput,
  CCol,
  CRow,
  CInputGroup,
  CInputGroupText,
  CBadge,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom';
import { deleteSchedules, getSchedulesList } from '../../api/schedules';

const Table = ({columns , name}) => {

  const [list, setlist] = useState([]);
  const [pages, setpages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [open, setOpen] = useState(false);

  const toaster = useToaster();
  const navigate = useNavigate();

  const message = (
    <Message showIcon type='success' closable>
      item deleted successful
    </Message>
  );

  const dateFormat = (dateStr)=>{

      const inputDate = new Date(dateStr);

      // Extract time and date separately
      const time = inputDate.toISOString().split('T')[1].split('.')[0]; // "10:00:00"
      const date = inputDate.toISOString().split('T')[0]; // "2022-12-01"

      // Format the date to "11 Jan 2024"
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = inputDate.toLocaleDateString('en-GB', options); // "01 Dec 2022"
      return {dateValue:formattedDate , time:time};
  }

  const deleteById = async (id) =>{
    const data = await deleteSchedules(id); 
    getSchedules();
    toaster.push(message, {placement:'topEnd',  duration:1000})
  }


  const getSchedules = async (page = 1) => {
    const data = await getSchedulesList(page); // Call API with the selected page
    setlist(data.reservations);
    setpages(data.pagination.totalPages);
    setActivePage(page); // Update active page
  }

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardBody>

          <CRow className='mb-3'>
            <CCol xs={12} className='d-flex justify-content-between'>
            <h3 className='card-title'>
              <Dropdown appearance="default" size='sm' title={'WH Name 2'}>
                <Dropdown.Item>Inbounded</Dropdown.Item>
                <Dropdown.Item>Outbounded</Dropdown.Item>
              </Dropdown>
            </h3>
              <CButton type="submit" color="primary">
              <CIcon icon={cilPlus} className="me-2"  onClick={()=>{navigate(`/schedules/save`)}} />
               New Schedule
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
            <CButton className='btn-filter' onClick={()=>{setOpen(true)}}> 
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
                    return (<div key={key}> 
                    <FCrad data={{id: el._id ,  date:dateFormat(el.datetime).dateValue , time:dateFormat(el.datetime).time , po_so:el.purchaseorder, check_in:el.checkin , edt:'02:20 PM' , check_out:el.checkout}} onDelete={deleteById} />
                      <Divider className='md' /></div>)
                  })}
                {/* <FCrad data={{date:'11 Jan 2024' , time:'10:00 PM' , po_so:'1234578' , check_in:'12:20 PM' , edt:'02:20 PM' , check_out:'--  :  --'}}/>
                <Divider  className='md' />
                <FCrad data={{date:'11 Jan 2024' , time:'10:00 PM' , po_so:'1234578' , check_in:'12:20 PM' , edt:'02:20 PM' , check_out:'--  :  --'}}/>
                <Divider  className='md' />
                <FCrad data={{date:'11 Jan 2024' , time:'10:00 PM' , po_so:'1234578' , check_in:'12:20 PM' , edt:'02:20 PM' , check_out:'--  :  --'}}/>
                <Divider  className='md' />
                <FCrad data={{date:'11 Jan 2024' , time:'10:00 PM' , po_so:'1234578' , check_in:'12:20 PM' , edt:'02:20 PM' , check_out:'--  :  --'}}/>
                <Divider  className='md' />
                <FCrad data={{date:'11 Jan 2024' , time:'10:00 PM' , po_so:'1234578' , check_in:'12:20 PM' , edt:'02:20 PM' , check_out:'--  :  --'}}/> */}
              </CCard>
            </CCol>
          </CRow>
          </CCardBody>
          <Divider className='my-1 md'/>
          <CRow>
            <CCol md={12} className='d-flex py-2' style={{ justifyContent: 'space-between' }}>
              <div
                onClick={() => activePage > 1 && getSchedules(activePage - 1)}
                style={{ cursor: 'pointer' }}
              >
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
                        onClick={() => getSchedules(pageNumber)} // Fetch data for clicked page
                        style={{ cursor: 'pointer' }}
                      >
                        {pageNumber}
                      </span>
                    )
                  })
                }
              </div>

              <div
                onClick={() => activePage < pages && getSchedules(activePage + 1)}
                style={{ cursor: 'pointer' }}
              >
                Next
                <CIcon icon={cilArrowRight} className='mx-2'></CIcon>
              </div>
            </CCol>
          </CRow>
        </CCard>
      </CCol>

      <Drawer size='xs' placement='right' className='filter-drawer' open={open}>
        <Drawer.Body>
          <div style={{lineHeight:0.8 , justifyContent: "space-between"}} className='d-flex'>
            <div>
              <p className='filter-title'>Filters</p>
              <p className='filter-subtitle'>Apply filters to table data</p>
            </div>
            <CloseIcon onClick={() => setOpen(false)}/>
          </div>
          <Divider style={{margin:0 }}/>

        
            <div className='filter-section'>
              <p className='lable'> Location </p>

              <InputGroup inside>
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
              <Input />
            </InputGroup>

              <Checkbox className='d-block' >Location 1</Checkbox>
              <Checkbox  className='d-block' >Location 2</Checkbox>
              <Checkbox  className='d-block' >Location 3</Checkbox>
            </div>  
          <Divider style={{margin:0 }}/>

          <div  className='filter-section'>
              <p className='lable'> Docks Status </p>

              <Checkbox className='d-block' >
                <CBadge color="success" shape="rounded-pill" className='d-block'> 
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-1'>
                    <circle cx="4" cy="4" r="3" fill="#12B76A"/>
                    </svg>
                     Available
                </CBadge>
              </Checkbox>
              <Checkbox  className='d-block' >
                <CBadge color="warning" shape="rounded-pill"  onClick={()=>{navigate(`/Facilities/view/${data.id}`)}}>
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-1'>
                  <circle cx="3" cy="3" r="3" fill="#F79009"/>
                  </svg>
                    Busy
                </CBadge>
              </Checkbox>
            </div>  
          <Divider style={{margin:0 }}/>

          <div  className='filter-section'>
              <p className='lable'> Forklift Status </p>
              <Checkbox className='d-block' >
                <CBadge color="success" shape="rounded-pill" className='d-block'> 
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-1'>
                    <circle cx="4" cy="4" r="3" fill="#12B76A"/>
                    </svg>
                     Available
                </CBadge>
              </Checkbox>
              <Checkbox  className='d-block' >
                <CBadge color="warning" shape="rounded-pill"  onClick={()=>{navigate(`/Facilities/view/${data.id}`)}}>
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-1'>
                  <circle cx="3" cy="3" r="3" fill="#F79009"/>
                  </svg>
                    Busy
                </CBadge>
              </Checkbox>
            </div>  


            <div  className='filter-section-footer'>
            <Divider style={{margin:0 }}/>
              <ButtonToolbar className='justify-content-between my-2' >
                     <Button appearance="link">Reset Filter</Button>
                     <div>
                      <Button appearance="default" className='mx-2'>Cancel</Button>
                      <Button appearance="primary">Apply</Button>
                     </div>
              </ButtonToolbar>
            </div>
        </Drawer.Body>
      </Drawer>
    </CRow>
  )
}

export default Table
