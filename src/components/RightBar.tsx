import ThreeDots from '../logos/ThreeDot.svg'
import Calendar from '../logos/Calendar.svg'
import Folder from '../logos/Folderlogo.svg'
import Favorite from '../logos/Favorites.svg'
import Archive from '../logos/Archived.svg'
import Delete from '../logos/Trash.svg'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NoteView from './NoteView'


function RightBar(){
    
    const {noteId}=useParams();
    const[data,setData]=useState(null);
    const [error, setError] = useState(null);
    const AxiosApi = axios.create({
        baseURL:'https://nowted-server.remotestate.com'
    })
    

    const[isVisible,setIsVisble]=useState(false);

    const handleToggle=()=>{setIsVisble(!isVisible)};

      useEffect(() => {

        AxiosApi.get(`/notes/${noteId}`)
          .then(response => {
            console.log(data);
            setData(response.data);
          })
          .catch(error => {
            setError(error);
          });
          
      }, [noteId]);

      if(noteId===undefined)return <NoteView/>
    return (
        <>
        <div className="w-1/2 bg-[#181818] px-12.5">
            {/* Title */}
            
            < div className="pt-12.5 pb-7.5 h-10 flex justify-between">
                <div className="text-white font-semibold text-[32px]">
                    {data && data.note ? data.note.title : ""}
                </div>
                <div>
                    <img src={ThreeDots} alt="Three Dots" onClick={handleToggle} />
                </div>
            </div>
            
            {/* On Clicking Add to Favorites Archive & delete */}
            <div className={`w-60 h-50 rounded-[6px] bg-[#333333] pl-4 top-20 right-20 flex-col justify-around absolute ${isVisible ? '' : 'hidden'}`} 
        id="FAD">
                <div className='flex pt-4 w-full'>
                    <img src={Favorite} className='pr-4 w-10 h-8'></img>
                    <p className='text-[#FFFFFF] text-[16px] '>Add to Favourites</p>
                </div>
                <div className='flex pt-5 pb-5 w-full items-center'>
                    <img src={Archive} className='pr-4 w-10 h-8'></img>
                    <p className='text-[#FFFFFF] text-[16px]'>Archive</p>
                </div>
                <div className='w-[172px] border-t border-[#FFFFFF05] w-full'> </div>
                <div className='flex pt-4 items-center'>
                    <img src={Delete} className='pr-4 w-10 h-8'></img>
                    <p className='text-[#FFFFFF] text-[16px]'>Delete</p>
                </div>

            </div>



            {/* Date and Folder */}
            <div className="pt-8">
                {/* Date Section */}
                <div className="flex items-center pb-4">
                    <img src={Calendar} className="pr-3" alt="Calendar" />
                    <p className="text-[#FFFFFF60] pr-7">Date</p>
                    <p className="text-white font-semibold text-4 underline">{data && data.note ? data.note.createdAt : ""}</p>
                </div>

                <div className="w-full border-t border-gray-300 my-4"></div>

                {/* Folder Section */}
                <div className="flex items-center pt-4">
                    <img src={Folder} className="pr-3" alt="Folder" />
                    <p className="text-[#FFFFFF60] pr-7">Folder</p>
                    <p className="text-white font-semibold text-4 underline">{data && data.note ? data.note.folder.name : ""}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="pt-7.5 overflow-auto pb-27">
                <p className="text-[#FFFFFF] text-400">{data && data.note ? data.note.content: ""}</p>
            </div>
        </div>
        </>
    );
}

export default RightBar;