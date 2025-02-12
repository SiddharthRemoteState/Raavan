import Nowted from '../logos/Nowted.svg'
import SearchIcon from '../logos/searchicon.svg'
import Document from '../logos/Document.svg'

function Sidebar() {
    const RecentsArray=[{title:"Reflection on the month of june Reflection on the month of june" ,id:123},{title:"Reflection on the month of june" ,id:1234},{title:"Reflection on the month of june" ,id:12345}]
    
    return (
        // Main Div
        <div className="h-screen w-1/4  py-7.5 border-2 border-red-500 bg-gray-600">

            {/* Nowted & SearchIcon */}
            <div className="border-2 border-black flex m-2 justify-between items-center px-5 "> 
                {/* Nowted Logo */}
                <img src={Nowted} className="" alt="Nowted logo" />
                {/* Search Icon */}
                <button><img src={SearchIcon} className="flex self-center cursor-pointer" alt="Search icon" /></button>
            </div>


            {/* NewNote */}
            <div className=' py-7.5 px-5 '>
                
                <div className=' bg-gray-400 flex justify-center h-10'>
                <button >
                <p className="cursor-pointer">+  New Note</p>
                </button>
                </div>
            </div>


            {/* Recents Div */}
            <div className='h-39  bg-amber-800 '>
                <div className='pl-5 pb-2'>Recents</div>
                <ul>
                {RecentsArray.slice(0,3).map((arr)=>(
                    <li key={arr.id} >
                        <div className='flex pb-1.25'>
                            <img src={Document} className='pl-5 pr-4'></img>
                            <p className='h-5 overflow-hidden'>{arr.title}</p>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
