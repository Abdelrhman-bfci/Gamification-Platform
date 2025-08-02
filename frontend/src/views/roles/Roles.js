import React from 'react'
import {
  CCard,
  CCardBody,
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
} from '@coreui/react'

import Table from './Table'
const Roles = () => {
  return (
    <Table columns={[{'name':'Role Name', w:3}, {'name':'Responsibilities', w:3}, {'name':'Assigned to',w:3}, {'name':'Status', w:2} , {'name':'', w:1}]} />
  )
}

export default Roles
