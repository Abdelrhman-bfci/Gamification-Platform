import React, { useState } from 'react'
import { cilWindowMaximize , cilTrash , cilPen} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {
  CBadge,
  CCol,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Divider, Dropdown, Modal } from 'rsuite'


const FCrad = ({data , onDelete}) => {

  
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (id) => {
    setSelectedItem({id });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      onDelete(selectedItem.id);
    }
    handleCloseModal();
  };


  return (
    <CRow  className='d-flex justify-content-space-between px-2 align-items-center' style={{cursor:'pointer'}}>
      <CCol xs={12} md={2}  className='d-flex  align-items-center hCol' onClick={()=>{navigate(`/schedules/view/${data.id}`)}}>
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg"  className='mx-2'>
        <path d="M14.5 27L16.5 29L21 24.5M21.9851 20.5499C21.995 20.3678 22 20.1845 22 20C22 14.4772 17.5228 10 12 10C6.47715 10 2 14.4772 2 20C2 25.4354 6.33651 29.858 11.7385 29.9966M12 14V20L15.7384 21.8692" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className='mx-1'>
          <span className='d-block text-black'>{data.time}</span>
          <span className='text-sm'>{data.date}</span>
        </div>

      </CCol>
     <CCol xs={12} md={2} className='hCol mx-2' onClick={()=>{navigate(`/schedules/view/${data.id}`)}}>
          <Dropdown appearance="default" size='sm' title={'Inbounded'}>
            <Dropdown.Item>Inbounded</Dropdown.Item>
            <Dropdown.Item>Outbounded</Dropdown.Item>
          </Dropdown>
      </CCol>
      <CCol xs={12} md={1}>
          {data.po_so}
      </CCol>
      <CCol xs={12} md={1}  className='d-flex hCol align-items-center' onClick={()=>{navigate(`/schedules/view/${data.id}`)}}>
          {data.check_in}
      </CCol>
      <CCol xs={12} md={1} className='hCol' onClick={()=>{navigate(`/schedules/view/${data.id}`)}}>
         {data.edt}
      </CCol>

      <CCol xs={12} md={1} className='hCol' onClick={()=>{navigate(`/schedules/view/${data.id}`)}}>
      <Dropdown appearance="default" size='sm' title={'D-24145'}>
            <Dropdown.Item>Inbounded</Dropdown.Item>
            <Dropdown.Item>Outbounded</Dropdown.Item>
          </Dropdown>
      </CCol>

      <CCol xs={12} md={1} className='hCol' onClick={()=>{navigate(`/schedules/view/${data.id}`)}}>
      <Dropdown appearance="default" size='sm' title={'FL-5874'}>
            <Dropdown.Item>Inbounded</Dropdown.Item>
            <Dropdown.Item>Outbounded</Dropdown.Item>
          </Dropdown>
      </CCol>

      <CCol xs={12} md={1} className='hCol' onClick={()=>{navigate(`/schedules/view/${data.id}`)}}>
         {data.check_out}
      </CCol>


      <CCol xs={12} md={1} className='hCol' onClick={()=>{navigate(`/schedules/view/${data.id}`)}}>
      <Dropdown appearance="default" size='sm' title={'Upcoming'}>
            <Dropdown.Item>Inbounded</Dropdown.Item>
            <Dropdown.Item>Outbounded</Dropdown.Item>
          </Dropdown>
      </CCol>


      <CCol xs={12} md={1} className='d-flex hCol justify-content-end'>
      <CIcon icon={cilTrash}   onClick={() => handleOpenModal(data.id)} />
      <CIcon icon={cilPen}  onClick={()=>{navigate(`/schedules/save/${data.id}`)}} className='mx-3' />
    
      </CCol>

       {/* Confirmation Modal */}
       <Modal open={isModalOpen} onClose={handleCloseModal} backdrop="static" size={'xs'}>
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{data.date}</strong>?
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

export default FCrad;
