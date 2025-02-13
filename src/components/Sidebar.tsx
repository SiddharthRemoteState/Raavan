import Nowted from '../logos/Nowted.svg'
import SearchIcon from '../logos/searchicon.svg'
import Document from '../logos/Document.svg'
import Folder from '../logos/Folderlogo.svg'
import ClosedFolder from '../logos/ClosedFolder.svg'
import Favorites from '../logos/Favorites.svg'
import Archived from '../logos/Archived.svg'
import Trash from '../logos/Trash.svg'
import { useState } from 'react'

function Sidebar() {


    const [Visible,setVisible]=useState(false);
    const [NewnoteVisible,setNewnoteVisible]=useState(true)
    const handleClick=()=>{
        setVisible(!Visible)
        setNewnoteVisible(!NewnoteVisible)
    }

    const RecentsArray=[{title:"Reflection on the month of june Reflection on the month of june" ,id:123},{title:"Reflection on the month of june" ,id:1234},{title:"Reflection on the month of june" ,id:12345}]
    const FoldersRecord=["Personal","Work","Travel","Events","Finances","Finances","Finances"];
    return (
        // Main Div
        <div className="h-screen w-1/4  py-7.5 border-2  primary-bg flex flex-col gap-7.5">
            
            {/* Nowted & SearchIcon */}
            <div className="flex justify-between items-center px-5 "> 
                {/* Nowted Logo */}
                <img src={Nowted} className="" alt="Nowted logo" />
                {/* Search Icon */}
                <button><img src={SearchIcon} className="flex self-center cursor-pointer" alt="Search icon" onClick={handleClick}/></button>
            </div>

            {/* FirstHidden */}
            <div className={`flex px-5 h-10 ${Visible ? '' : 'hidden'}`}>
                <img src={SearchIcon} className='pr-3' alt="Search" />
                <input placeholder='Search Note' className='text-white' />
            </div>

            {/* NewNote */}
            <div className={`px-5 flex justify-center items-center h-10 w-full ${NewnoteVisible ? '' : 'hidden'}`}>
                <div className='flex justify-center items-center w-full'>
                    <p className="cursor-pointer w-full new-note text-white text-center">+ New Note</p>
                </div>
            </div>



            {/* Recents Div */}
            <div className='h-39   '>
                <div className='pl-5 pb-2 text-[#FFFFFF] opacity-60 recent-font'>Recents</div>
                <ul className='flex-col justify-evenly '>
                {RecentsArray.slice(0,3).map((arr)=>(
                    <li key={arr.id} >
                        <div className='flex pb-1.25'>
                            <img src={Document} className='pl-5 pr-4 pb-4 opacity-60' ></img>
                            <p className='h-5 overflow-hidden text-[#FFFFFF] opacity-60 font-semibold'>{arr.title}</p>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
            
            {/* Folders */}
            <div className='h-[62] w-[75]  pl-5  '>
                <div className='flex justify justify-between text-white h-5 pr-5'>
                    <div className='pb-2.5 text-[#FFFFFF] opacity-60'>Folders</div>
                    <button className='cursor-pointer'><img src={Folder}></img></button>
                </div>
                    <ul className='overflow-y-auto max-h-50'>
                    {FoldersRecord.map((foldername,index)=>(
                        <li key={index} className='flex items-center h-10'>
                            <img src={ClosedFolder} className='pr-3.75 text-white' alt="Closed Folder" />
                            <p className='text-[#FFFFFF] opacity-60'>{foldername}</p>
                        </li>
                    ))
                }
                    </ul>
                
            </div>

            {/* More */}
            <div className='pl-5 '>
                <div className='font-600 text-[#FFFFFF] opacity-60'>More</div>
                <div className='flex w-75 h-10 self-center'>
                    <img src={Favorites} className='self-center pr-4.25'></img>
                    <p className='self-center text-[#FFFFFF] opacity-60'>Favorites</p>
                </div>
                <div className='flex w-75 h-10'>
                    <img src={Trash} className='self-center pr-4.25'></img>
                    <p className='self-center text-[#FFFFFF] opacity-60'>Favorites</p>
                </div>
                <div className='flex w-75 h-10'>
                    <img src={Archived} className='self-center pr-4.25'></img>
                    <p className='self-center text-[#FFFFFF] opacity-60'>Favorites</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
