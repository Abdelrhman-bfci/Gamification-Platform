import {CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { Form, ButtonToolbar, Button, SelectPicker, Divider , Modal, Placeholder, TimePicker, InputNumber, Toggle, Message, useToaster} from 'rsuite';

import React, { useEffect, useState } from 'react'
import { updateDock , createDock } from '../../api/leaderboard'
import { getAllwarehouses } from '../../api/facility'
import { useParams } from 'react-router-dom';




const FKForm = () => {


    const [form , setForm] = useState({Name:"", status:"", warehouseID:"", Phone:"", Type:""});
    const [warehouselist , setWarehouseList] = useState([]);


    const toaster = useToaster();
    const params = useParams()

    const message = (
        <Message showIcon type='success' closable>
          Operation Done successful
        </Message>
      );


    const createOrUpdateForklifts = async (data)=>{
        if(params.id){
        await updateDock(params.id , data);
        }else{
         await createDock(data);
        }

        toaster.push(message, {placement:'topEnd',  duration:1000})
    }

    // var warehouselist = [];

    const getWarehouseslookup = async ()=>{
      const data =   await getAllwarehouses();

      console.log(data.map(el => ({label : el.Name , value:el._id})))

      setWarehouseList(data.map(el => ({label : el.Name || " " , value:el._id})))

      console.log(warehouselist)
    }

    const getForkliftById = async ()=>{
        // if(params.id){
        // const data =  await getwarehouseById(params.id);
        // setForm(data);
        // }
    }

    useEffect(()=>{
        getForkliftById();
        getWarehouseslookup();
    },[])


    const statuslist = ['available', 'occupied', 'busy'].map(
        item => ({ label: item, value: item })
      );

  return (
    <CRow className='justify-content-center'>
        <CCol xs={8}>
        <CCard>
                <CCardBody>
                    <CCol xs={12} className='d-flex justify-content-between mb-3'>
                        <h3 className='card-title'>{params.id? 'Edit Dock':'Add a new Forklift'}</h3>
                    </CCol>
                    <CCol>
                        <Form fluid>
                            <Form.Group controlId="name-1">
                                <Form.ControlLabel>Forklift Name</Form.ControlLabel>
                                <Form.Control name="Name" value={form.Name} onChange={(value)=>{setForm({...form , Name:value})}} />
                            </Form.Group>
                            <Form.Group controlId="name-1">
                                <Form.ControlLabel>Forklift Type</Form.ControlLabel>
                                <SelectPicker data={warehouselist} value={form.Type} onChange={(value)=>{setForm({...form , Type:value})}} searchable={true} style={{ width: '100%' }} />
                            </Form.Group>
                            <Form.Group controlId="name-1">
                                <Form.ControlLabel>Warehouse</Form.ControlLabel>
                                <SelectPicker data={warehouselist} value={form.warehouseID} onChange={(value)=>{setForm({...form , warehouseID:value})}} searchable={true} style={{ width: '100%' }} />
                            </Form.Group>
                            <Form.Group controlId="name-1">
                                <Form.ControlLabel>Driver Phone Number</Form.ControlLabel>
                                <Form.Control name="Name" value={form.Phone} onChange={(value)=>{setForm({...form , Name:value})}} />
                            </Form.Group>
                            <Form.Group controlId="name-1">
                                <Form.ControlLabel>Forklift Status</Form.ControlLabel>
                                <SelectPicker data={statuslist} value={form.status} onChange={(value)=>{setForm({...form , status:value})}} searchable={false} style={{ width: '100%' }} />
                            </Form.Group>

                            <Divider/>
                            <Form.Group>
                            <ButtonToolbar className='justify-content-end'>
                                <Button appearance="default">Cancel</Button>
                                <Button appearance="primary" onClick={()=>{createOrUpdateForklifts(form)}}>Add Forklift</Button>
                            </ButtonToolbar>
                            </Form.Group>
                        </Form>
                    </CCol>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
  )
}

export default FKForm
