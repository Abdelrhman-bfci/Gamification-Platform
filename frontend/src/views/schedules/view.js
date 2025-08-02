import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { Form, ButtonToolbar, Button, SelectPicker, Divider , Modal, Placeholder, TimePicker, InputNumber, Toggle, Breadcrumb, Message, useToaster} from 'rsuite';

import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react';
import { cilHome, cilPen, cilPlus, cilTrash } from '@coreui/icons';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import { deleteSchedules  ,  getSchedules} from '../../api/schedules'
import { useNavigate, useParams } from 'react-router-dom';
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';




const view = () => { 

    const position = {lat: 53.54992, lng: 10.00678};

    
    const [schedules , setSchedules] = useState({
        direction:"", 
        checkin:"", 
        checkout:"" ,
        appointmenttype:"",
        purchaseorder:"",
        workorder:"",
        goodtype:"",
        quantity:"",
        weight:"",
        length:"",
        width:"",
        height:"",
        notes:"",
        carriername:"",
        carrieremail:"",
        carriermobile:"",
        shippername:"",
        shipperemail:"",
        datetime:"",
        expectedDate:"",
        ordercode:"",
        orderstatus:"",
        progressstatus:"",
        created:"",
        updated:""

    });

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);



    const toaster = useToaster();

    const params = useParams();


    const message = (
        <Message showIcon type='success' closable>
          item deleted successful
        </Message>
      );

      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
    
      };
    
      const confirmDelete = () => {
        deleteById()
        handleCloseModal();
      };  
    
      const deleteById = async () =>{
        const data = await deleteSchedules(params.id); 
        toaster.push(message, {placement:'topEnd',  duration:1000})
        navigate('/schedules')
      }

    
    

    const getScheduleById = async ()=>{
        if(params.id){
        const data =  await getSchedules(params.id);
        setSchedules(data);
        }
    }

    useEffect(()=>{
        getScheduleById();
    },[])

  


  return (
    <CRow className='justify-content-center'>
        <CCol xs={12}>
        <CCard style={{padding:'0.8rem'}}>
                <CCardBody>
                    <CCol xs={12}>
                    <Breadcrumb separator={<AngleRightIcon />} className='font-size-default'>
                        <Breadcrumb.Item  href="/">
                         <CIcon icon={cilHome}></CIcon>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item  href='/schedules'>
                          schedules
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{schedules.appointmenttype}</Breadcrumb.Item>
                    </Breadcrumb>
                    </CCol>
                    <CCol xs={12} className='d-flex justify-content-between mb-3'>
                        <h3 className='card-title'>Schedule Details</h3>

                        <div>
                        <CButton color='default' onClick={() =>{handleOpenModal()}}>  
                           <CIcon icon={cilTrash} />
                        </CButton>
                        <CButton color='default' onClick={()=>{navigate(`/schedules/save/${params.id}`)}} className='mx-2'>  
                           <CIcon icon={cilPen} /> 
                        </CButton> 
                          <CButton type="submit" color="primary" onClick={()=>{ navigate('/schedules/save')}}>
                            <CIcon icon={cilPlus} className="me-2" />
                               New Schedules
                            </CButton>
                        </div>
                    </CCol>

                    <CRow>
                    <CCol xs={8}>
                    <CCard>
                     <CCardBody>
                        <CRow>
                            <CCol xl={12}>
                                <div className='d-flex'>
                            
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_11117_51731)">
                                    <rect x="2" y="1" width="40" height="40" rx="8" fill="white"/>
                                    <rect x="2.5" y="1.5" width="39" height="39" rx="7.5" stroke="#F2F4F7"/>
                                    <path d="M27.8333 28.5L22 24.3333L16.1666 28.5V15.1667C16.1666 14.7246 16.3422 14.3007 16.6548 13.9882C16.9673 13.6756 17.3913 13.5 17.8333 13.5H26.1666C26.6087 13.5 27.0326 13.6756 27.3451 13.9882C27.6577 14.3007 27.8333 14.7246 27.8333 15.1667V28.5Z" stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                </svg>


                                   
                                    <div className='details-card'>
                                        <p className='details-title'>Purpose</p>
                                        <p className='details-name'>Schedule a pick up</p>
                                        <p className='details-subtitle'>Schedule a new outbound appointment</p>
                                        {/* <p className='details-subtitle'>{schedules.appointmenttype}</p> */}
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                        <Divider className='md'/>

                        <CRow>
                            <CCol xl={12}>
                                <div className='d-flex'>
                            
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_11117_26478)">
                                    <rect x="2" y="1" width="40" height="40" rx="8" fill="white"/>
                                    <rect x="2.5" y="1.5" width="39" height="39" rx="7.5" stroke="#F2F4F7"/>
                                    <path d="M30.1818 17.5455V29.3636H13.8182V17.5455M20.1818 21.1818H23.8182M12 13H32V17.5455H12V13Z" stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                </svg>



                                   
                                    <div className='details-card'>
                                        <p className='details-title'>Warehouse</p>
                                        <p className='details-name'>WH Name</p>
                                        <div className='d-flex' style={{alignItems:'baseline'}}>
                                            <svg className='mr-2' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.5 8.33337C16.5 14.1667 9 19.1667 9 19.1667C9 19.1667 1.5 14.1667 1.5 8.33337C1.5 6.34425 2.29018 4.4366 3.6967 3.03007C5.10322 1.62355 7.01088 0.833374 9 0.833374C10.9891 0.833374 12.8968 1.62355 14.3033 3.03007C15.7098 4.4366 16.5 6.34425 16.5 8.33337Z" stroke="#98A2B3" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M9 10.8334C10.3807 10.8334 11.5 9.71409 11.5 8.33337C11.5 6.95266 10.3807 5.83337 9 5.83337C7.61929 5.83337 6.5 6.95266 6.5 8.33337C6.5 9.71409 7.61929 10.8334 9 10.8334Z" stroke="#98A2B3" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p className='details-subtitle'>3581 1 Al Bustan Dist Al Khobar 34422 add 7099</p>
                                        </div>
                                        <div className='d-flex' style={{alignItems:'baseline'}}>
                                         <svg className='mr-2'  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">                                    
                                             <path d="M19.1665 5.83337V0.833374M19.1665 0.833374H14.1665M19.1665 0.833374L13.3332 6.66671M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2745C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1113 17.2005 18.1856C16.9806 18.26 16.7477 18.2876 16.5165 18.2667C13.9522 17.9881 11.489 17.1118 9.32486 15.7084C7.31139 14.4289 5.60431 12.7219 4.32486 10.7084C2.91651 8.53438 2.04007 6.0592 1.76653 3.48337C1.7457 3.25293 1.77309 3.02067 1.84695 2.80139C1.9208 2.58211 2.03951 2.38061 2.1955 2.20972C2.3515 2.03883 2.54137 1.9023 2.75302 1.80881C2.96468 1.71532 3.19348 1.66693 3.42486 1.66671H5.92486C6.32929 1.66273 6.72136 1.80594 7.028 2.06965C7.33464 2.33336 7.53493 2.69958 7.59153 3.10004C7.69705 3.9001 7.89274 4.68565 8.17486 5.44171C8.28698 5.73998 8.31125 6.06414 8.24479 6.37577C8.17832 6.68741 8.02392 6.97347 7.79986 7.20004L6.74153 8.25837C7.92783 10.3447 9.65524 12.0721 11.7415 13.2584L12.7999 12.2C13.0264 11.976 13.3125 11.8216 13.6241 11.7551C13.9358 11.6887 14.2599 11.7129 14.5582 11.825C15.3143 12.1072 16.0998 12.3029 16.8999 12.4084C17.3047 12.4655 17.6744 12.6694 17.9386 12.9813C18.2029 13.2932 18.3433 13.6914 18.3332 14.1Z" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                         </svg>
                                            <p className='details-subtitle'>Suporting Text</p>
                                        </div>
                                        <div className='d-flex' style={{alignItems:'baseline'}}>
                                            <svg  className='mr-2' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M18.3333 5.00004C18.3333 4.08337 17.5833 3.33337 16.6666 3.33337H3.33329C2.41663 3.33337 1.66663 4.08337 1.66663 5.00004M18.3333 5.00004V15C18.3333 15.9167 17.5833 16.6667 16.6666 16.6667H3.33329C2.41663 16.6667 1.66663 15.9167 1.66663 15V5.00004M18.3333 5.00004L9.99996 10.8334L1.66663 5.00004" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <p className='details-subtitle'>Suporting Text</p>
                                        </div>
                                      
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                        <Divider className='md'/>

                        <CRow>
                            <CCol xl={12}>
                                <div className='d-flex'>
                            
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_d_11117_27011)">
                                        <rect x="2" y="1" width="40" height="40" rx="8" fill="white"/>
                                        <rect x="2.5" y="1.5" width="39" height="39" rx="7.5" stroke="#F2F4F7"/>
                                        <path d="M14.725 16.8L22 21.0083L29.275 16.8M22 29.4V21M29.5 24.3333V17.6666C29.4997 17.3744 29.4225 17.0873 29.2763 16.8343C29.13 16.5812 28.9198 16.3711 28.6667 16.225L22.8333 12.8916C22.58 12.7453 22.2926 12.6683 22 12.6683C21.7074 12.6683 21.42 12.7453 21.1667 12.8916L15.3333 16.225C15.0802 16.3711 14.87 16.5812 14.7237 16.8343C14.5775 17.0873 14.5003 17.3744 14.5 17.6666V24.3333C14.5003 24.6256 14.5775 24.9126 14.7237 25.1657C14.87 25.4187 15.0802 25.6288 15.3333 25.775L21.1667 29.1083C21.42 29.2546 21.7074 29.3316 22 29.3316C22.2926 29.3316 22.58 29.2546 22.8333 29.1083L28.6667 25.775C28.9198 25.6288 29.13 25.4187 29.2763 25.1657C29.4225 24.9126 29.4997 24.6256 29.5 24.3333Z" stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                    </svg>




                                   
                                    <div className='details-card'>
                                        <p className='details-title'>Cargo</p>
                                        <p className='details-name'>PO/WO</p>
                                        <p className='details-subtitle'>Good Type</p>
                                        <p className='details-subtitle'>Qty: 50</p>
                                       
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                        <Divider className='md'/>

                        <CRow>
                            <CCol xl={6}>
                                <div className='d-flex'>
                            
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_d_11117_1178)">
                                            <rect x="2" y="1" width="40" height="40" rx="8" fill="white"/>
                                            <rect x="2.5" y="1.5" width="39" height="39" rx="7.5" stroke="#F2F4F7"/>
                                            <g clip-path="url(#clip0_11117_1178)">
                                            <path d="M18.6666 21L22 24.3333M22 24.3333L25.3333 21M22 24.3333V17.6666M30.3333 21C30.3333 25.6023 26.6023 29.3333 22 29.3333C17.3976 29.3333 13.6666 25.6023 13.6666 21C13.6666 16.3976 17.3976 12.6666 22 12.6666C26.6023 12.6666 30.3333 16.3976 30.3333 21Z" stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        </g>
                                    </svg>




                                   
                                    <div className='details-card'>
                                        <p className='details-title'>Carrier</p>
                                        <p className='details-name'>Carrier Name</p>
                                        <div className='d-flex' style={{alignItems:'baseline'}}>
                                         <svg className='mr-2'  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">                                    
                                             <path d="M19.1665 5.83337V0.833374M19.1665 0.833374H14.1665M19.1665 0.833374L13.3332 6.66671M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2745C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1113 17.2005 18.1856C16.9806 18.26 16.7477 18.2876 16.5165 18.2667C13.9522 17.9881 11.489 17.1118 9.32486 15.7084C7.31139 14.4289 5.60431 12.7219 4.32486 10.7084C2.91651 8.53438 2.04007 6.0592 1.76653 3.48337C1.7457 3.25293 1.77309 3.02067 1.84695 2.80139C1.9208 2.58211 2.03951 2.38061 2.1955 2.20972C2.3515 2.03883 2.54137 1.9023 2.75302 1.80881C2.96468 1.71532 3.19348 1.66693 3.42486 1.66671H5.92486C6.32929 1.66273 6.72136 1.80594 7.028 2.06965C7.33464 2.33336 7.53493 2.69958 7.59153 3.10004C7.69705 3.9001 7.89274 4.68565 8.17486 5.44171C8.28698 5.73998 8.31125 6.06414 8.24479 6.37577C8.17832 6.68741 8.02392 6.97347 7.79986 7.20004L6.74153 8.25837C7.92783 10.3447 9.65524 12.0721 11.7415 13.2584L12.7999 12.2C13.0264 11.976 13.3125 11.8216 13.6241 11.7551C13.9358 11.6887 14.2599 11.7129 14.5582 11.825C15.3143 12.1072 16.0998 12.3029 16.8999 12.4084C17.3047 12.4655 17.6744 12.6694 17.9386 12.9813C18.2029 13.2932 18.3433 13.6914 18.3332 14.1Z" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                         </svg>
                                            <p className='details-subtitle'>Suporting Text</p>
                                        </div>
                                        <div className='d-flex' style={{alignItems:'baseline'}}>
                                            <svg  className='mr-2' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M18.3333 5.00004C18.3333 4.08337 17.5833 3.33337 16.6666 3.33337H3.33329C2.41663 3.33337 1.66663 4.08337 1.66663 5.00004M18.3333 5.00004V15C18.3333 15.9167 17.5833 16.6667 16.6666 16.6667H3.33329C2.41663 16.6667 1.66663 15.9167 1.66663 15V5.00004M18.3333 5.00004L9.99996 10.8334L1.66663 5.00004" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <p className='details-subtitle'>info@example.com </p>
                                        </div>
                                      
                                    </div>
                                </div>
                            </CCol>
                            <CCol xl={6}>
                                <div className='d-flex'>
                            
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_11117_32337)">
                                    <rect x="2" y="1" width="40" height="40" rx="8" fill="white"/>
                                    <rect x="2.5" y="1.5" width="39" height="39" rx="7.5" stroke="#F2F4F7"/>
                                    <g clip-path="url(#clip0_11117_32337)">
                                    <path d="M25.3333 21L22 17.6666M22 17.6666L18.6666 21M22 17.6666V24.3333M30.3333 21C30.3333 25.6023 26.6023 29.3333 22 29.3333C17.3976 29.3333 13.6666 25.6023 13.6666 21C13.6666 16.3976 17.3976 12.6666 22 12.6666C26.6023 12.6666 30.3333 16.3976 30.3333 21Z" stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    </g>
                                </svg>




                                   
                                    <div className='details-card'>
                                        <p className='details-title'>Shipper</p>
                                        <p className='details-name'>Shipper Name</p>
                                        <div className='d-flex' style={{alignItems:'baseline'}}>
                                         <svg className='mr-2'  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">                                    
                                             <path d="M19.1665 5.83337V0.833374M19.1665 0.833374H14.1665M19.1665 0.833374L13.3332 6.66671M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2745C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1113 17.2005 18.1856C16.9806 18.26 16.7477 18.2876 16.5165 18.2667C13.9522 17.9881 11.489 17.1118 9.32486 15.7084C7.31139 14.4289 5.60431 12.7219 4.32486 10.7084C2.91651 8.53438 2.04007 6.0592 1.76653 3.48337C1.7457 3.25293 1.77309 3.02067 1.84695 2.80139C1.9208 2.58211 2.03951 2.38061 2.1955 2.20972C2.3515 2.03883 2.54137 1.9023 2.75302 1.80881C2.96468 1.71532 3.19348 1.66693 3.42486 1.66671H5.92486C6.32929 1.66273 6.72136 1.80594 7.028 2.06965C7.33464 2.33336 7.53493 2.69958 7.59153 3.10004C7.69705 3.9001 7.89274 4.68565 8.17486 5.44171C8.28698 5.73998 8.31125 6.06414 8.24479 6.37577C8.17832 6.68741 8.02392 6.97347 7.79986 7.20004L6.74153 8.25837C7.92783 10.3447 9.65524 12.0721 11.7415 13.2584L12.7999 12.2C13.0264 11.976 13.3125 11.8216 13.6241 11.7551C13.9358 11.6887 14.2599 11.7129 14.5582 11.825C15.3143 12.1072 16.0998 12.3029 16.8999 12.4084C17.3047 12.4655 17.6744 12.6694 17.9386 12.9813C18.2029 13.2932 18.3433 13.6914 18.3332 14.1Z" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                         </svg>
                                            <p className='details-subtitle'>Suporting Text</p>
                                        </div>
                                        <div className='d-flex' style={{alignItems:'baseline'}}>
                                            <svg  className='mr-2' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M18.3333 5.00004C18.3333 4.08337 17.5833 3.33337 16.6666 3.33337H3.33329C2.41663 3.33337 1.66663 4.08337 1.66663 5.00004M18.3333 5.00004V15C18.3333 15.9167 17.5833 16.6667 16.6666 16.6667H3.33329C2.41663 16.6667 1.66663 15.9167 1.66663 15V5.00004M18.3333 5.00004L9.99996 10.8334L1.66663 5.00004" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <p className='details-subtitle'>info@example.com </p>
                                        </div>
                                      
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                        <Divider className='md'/>
                       
                            <CRow>
                            <CCol xl={6}>
                                <div className='d-flex'>
                            
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_11117_4879)">
                                    <rect x="2" y="1" width="40" height="40" rx="8" fill="white"/>
                                    <rect x="2.5" y="1.5" width="39" height="39" rx="7.5" stroke="#F2F4F7"/>
                                    <path d="M29.5 19.3333H14.5M25.3333 12.6666V16M18.6667 12.6666V16M18.5 29.3333H25.5C26.9001 29.3333 27.6002 29.3333 28.135 29.0608C28.6054 28.8211 28.9878 28.4387 29.2275 27.9683C29.5 27.4335 29.5 26.7334 29.5 25.3333V18.3333C29.5 16.9332 29.5 16.2331 29.2275 15.6983C28.9878 15.2279 28.6054 14.8455 28.135 14.6058C27.6002 14.3333 26.9001 14.3333 25.5 14.3333H18.5C17.0999 14.3333 16.3998 14.3333 15.865 14.6058C15.3946 14.8455 15.0122 15.2279 14.7725 15.6983C14.5 16.2331 14.5 16.9332 14.5 18.3333V25.3333C14.5 26.7334 14.5 27.4335 14.7725 27.9683C15.0122 28.4387 15.3946 28.8211 15.865 29.0608C16.3998 29.3333 17.0999 29.3333 18.5 29.3333Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                </svg>





                                   
                                    <div className='details-card'>
                                        <p className='details-title'>Appointment</p>
                                        <p className='details-name'>Jan 6, 2024</p>
                                        <p className='details-subtitle'>11:00 PM </p>
                                          
                                    </div>
                                </div>
                            </CCol>
                            <CCol xl={6}>
                                <div className='d-flex'>
                            
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_11117_3637)">
                                    <rect x="2" y="1" width="40" height="40" rx="8" fill="white"/>
                                    <rect x="2.5" y="1.5" width="39" height="39" rx="7.5" stroke="#F2F4F7"/>
                                        <g clip-path="url(#clip0_11117_3637)">
                                        <path d="M22 16V21L25.3333 22.6666M30.3333 21C30.3333 25.6023 26.6023 29.3333 22 29.3333C17.3976 29.3333 13.6666 25.6023 13.6666 21C13.6666 16.3976 17.3976 12.6666 22 12.6666C26.6023 12.6666 30.3333 16.3976 30.3333 21Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                    </g>
                                </svg>
                                 
                                <div className='details-card'>
                                        <p className='details-title'>Expected Delivery Time</p>
                                        <p className='details-name'>Jan 6, 2024</p>
                                        <p className='details-subtitle'>11:00 PM </p>
                                          
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                     </CCardBody>
                   </CCard>
                    </CCol>

                    <CCol xs={4}>
                    <CCard>
                    <CCardBody>
                    <APIProvider apiKey={'AIzaSyDLfUZRAhGbaI4vnKZmWE9Dz0K-y9-42V8'} style={{height:'100vh'}}>
                        <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID" style={{height:'100vh'}}>
                            <AdvancedMarker position={position} />
                        </Map>
                        </APIProvider>
                    </CCardBody>
                    </CCard>
                    </CCol>
                    </CRow>
                 
                </CCardBody>
            </CCard>
        </CCol>

          {/* Confirmation Modal */}
       <Modal open={isModalOpen} onClose={handleCloseModal} backdrop="static" size={'xs'}>
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{schedules.datetime}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={confirmDelete} appearance="primary" color="red">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </CRow>
  )
}

export default view
