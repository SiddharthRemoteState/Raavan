import React from 'react'
import Sidebar from '../components/Sidebar'
import CentreBar from '../components/CentreBar'
import RestoreView from '../components/RestoreView'
function Trash() {
  return (
    <div className="flex">
        <Sidebar/>
        <CentreBar/>
        <RestoreView/>
    </div>
  )
}

export default Trash;