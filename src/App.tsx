
import RightBar from './components/RightBar'
import Sidebar from './components/Sidebar'
import CentreBar from './components/CentreBar'
import NoteView from './components/NoteView'
import RestoreView from './components/RestoreView'
import Home from './Pages/Home'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Trash from './Pages/Trash'



function App() {

  return (  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/folders/:folderId' element={<Home/>}/>
        <Route path='/folders/:folderId/note/:noteId' element={<Home/>}/>
        <Route path='/trash' element={<Trash/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
