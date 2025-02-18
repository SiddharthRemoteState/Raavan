import ThreeDots from '../logos/ThreeDot.svg'
import Calendar from '../logos/Calendar.svg'
import Folder from '../logos/Folderlogo.svg'
import Favorite from '../logos/Favorites.svg'
import Archive from '../logos/Archived.svg'
import Delete from '../logos/Trash.svg'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ClosedNoteView from './ClosedNoteView'
import Trash from '../Pages/Trash'
import RestoreView from './RestoreView'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'

function RightBar({notesChange,setNotesChange,favoritesChange,setFavoritesChange,archivedChange,setArchivedChange,deleteClicked,setDeleteClicked}){
    
    const navigate=useNavigate();
    const {noteId}=useParams();
    const {folderId}=useParams();
    const[data,setData]=useState(null);
    const [error, setError] = useState(null);
    const [isFavorite,setIsFavorite]=useState(true);
    const [isArchived,setIsArchived]=useState(true);
    // const [note,setNote]=useState([]);
    const[isVisible,setIsVisble]=useState(false);

    const AxiosApi = axios.create({
        baseURL:'https://nowted-server.remotestate.com'
    })
    

    const handleToggle=()=>{setIsVisble(!isVisible)};

      useEffect(() => {

        AxiosApi.get(`/notes/${noteId}`)
          .then(response => {
              setData(response.data);
              setIsFavorite(data.note.isFavorite);
              setIsArchived(data.note.isArchived);
          })
          .catch(error => {
            setError(error);
          });
          
      }, [noteId]);


    const HandleAddToFavorite=()=>{
        setIsFavorite(!isFavorite);
        AxiosApi.patch(`/notes/${noteId}`,{
            isFavorite
        })
        .then(response=>{
            AxiosApi.get(`/notes/${noteId}`)
            .then(response=>{
            setData(response.data)
            setFavoritesChange(!favoritesChange)
        })
        })
    }


    const HandleAddToArchive=()=>{
        setIsArchived(!isArchived);
        AxiosApi.patch(`/notes/${noteId}`,{
            isArchived
        })
        .then(response=>{
            AxiosApi.get(`/notes/${noteId}`)
            .then(response=>{
            setData(response.data)
            setArchivedChange(!archivedChange);
            navigate(`/folders/${folderId}`);
        })
        })
    }

    const HandleDelete=()=>{
        AxiosApi.delete(`/notes/${noteId}`)
        setDeleteClicked(!deleteClicked)
        console.log("Deleted ")
    }


      if(noteId===undefined)return <ClosedNoteView/>
      if(folderId=='trash')return <RestoreView/>
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
            
            {/* On Clicking make them visible & block them Add to Favorites Archive & delete */}
            <div className={`w-60 h-50 rounded-[6px] bg-[#333333] pl-4 top-20 right-20 flex-col justify-around absolute ${isVisible ? '' : 'hidden'}`} 
        id="FAD">
                <div className='flex pt-4 w-full hover:bg-blue-500' onClick={HandleAddToFavorite} >
                    <img src={Favorite} className='pr-4 w-10 h-8'></img>
                    <p className='text-[#FFFFFF] text-[16px] '>{`${data && data.note && (data.note.isFavorite === undefined) ? 'Add to Favorite' : data && data.note && data.note.isFavorite ? "Remove From Favorites" : "Add to Favorite"}`}</p>

                </div>
                <div className='flex pt-5 pb-5 w-full hover:bg-blue-500 items-center' onClick={HandleAddToArchive}>
                    <img src={Archive} className='pr-4 w-10 h-8'></img>
                    <p className='text-[#FFFFFF] text-[16px]'>{`${data && data.note && (data.note.isArchived === undefined) ? 'Archive' : data && data.note && data.note.isArchived ? "Unarchive" : "Archive"}`}</p>
                </div>

                <div className='flex pt-4 items-center hover:bg-blue-500' onClick={HandleDelete}>
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
            {/* <div className="pt-7.5 overflow-auto pb-27">
                <p className="text-[#FFFFFF] text-400">{data && data.note ? data.note.content: ""}</p>
            </div> */}
        </div>
        </>
    );
}

export default RightBar;