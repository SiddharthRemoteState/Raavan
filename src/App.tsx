
import RightBar from './components/RightBar'
import Sidebar from './components/Sidebar'
import CentreBar from './components/CentreBar'
import NoteView from './components/NoteView'


function App() {

  return (
    <div className='h-screen w-screen bg-black flex'>
      <Sidebar/>
      <CentreBar/>
      <NoteView/>
    </div>
  )
}

export default App
