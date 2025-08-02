import React from 'react'
import Table from './Table'
const Schedules = () => {
  return (
    <Table columns={[{'name':'Appointment', w:2}, {'name':'Direction ', w:2}, {'name':'PO/SO',w:1},{'name':'Check In' , w:1}, {'name':'EDT', w:1} , {'name':'Dock', w:1},{'name':'Forklift' , w:1}, {'name':'Check Out', w:1} , {'name':'Status', w:1} , {'name':'', w:1}]} />
  )
}

export default Schedules
