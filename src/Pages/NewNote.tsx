import React from 'react'
import Sidebar from '../components/Sidebar'
import CentreBar from '../components/CentreBar'
import NoteView from '../components/NoteView'
import AddNotes from '../components/AddNotes'
function NewNote() {
  return (
    <div className="flex h-screen ">
        <Sidebar/>
        <CentreBar/>
        <AddNotes/>
    </div>
  )
}

export default NewNote;