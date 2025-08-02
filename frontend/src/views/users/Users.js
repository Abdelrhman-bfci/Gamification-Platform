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
const Forklifts = () => {
  return (
    <Table columns={[{'name':'User', w:3}, {'name':'Phone Number', w:2}, {'name':'Role',w:2},{'name':'Last Visit' , w:2}, {'name':'Status', w:2} , {'name':'', w:1}]} />
  )
}

export default Forklifts
