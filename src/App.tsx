
import RightBar from './components/RightBar'
import Sidebar from './components/Sidebar'
import CentreBar from './components/CentreBar'
import NoteView from './components/NoteView'
import RestoreView from './components/RestoreView'


function App() {

  return (
    <div className='h-screen w-screen bg-black flex'>
      <Sidebar/>
      <CentreBar/>
      <RestoreView/>
    </div>
  )
}

export default App
