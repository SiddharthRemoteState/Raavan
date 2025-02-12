
import RightBar from './components/RightBar'
import Sidebar from './components/Sidebar'
import CentreBar from './components/CentreBar'


function App() {

  return (
    <div className='h-screen w-screen bg-black flex'>
      <Sidebar/>
      <CentreBar/>
      <RightBar/>
    </div>
  )
}

export default App
