import { useState } from "react";
import ThreeDots from "../logos/ThreeDot.svg";
import Favorite from "../logos/Favorites.svg";
import Archive from "../logos/Archived.svg";
import Delete from "../logos/Trash.svg";
import Calendar from "../logos/Calendar.svg";
import Folder from "../logos/Folderlogo.svg"; 
import axios from "axios";
import { useParams } from "react-router-dom";


// https://nowted-server.remotestate.com/notes


function AddNotes() {
    const [isVisible, setIsVisible] = useState(false);
    const handleToggle = () => { setIsVisible(!isVisible); };
    const [NotesTitle,setNotesTitle]=useState("Your Note title goes Here");
    const [NotesContent,setNotesContent]=useState("Enter Your Content Here");
    const {folderId} = useParams();

    const AxiosApi = axios.create({
        baseURL: "https://nowted-server.remotestate.com",
      });
    

//    "folderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "title": "string",
//   "content": "string",
//   "isFavorite": true,
//   "isArchived": true


    // Submit button clicked & New Note Added
    const SubmitBtnClick=()=>{
        const notesdata={
            folderId,
            content:NotesContent,
            title:NotesTitle,
        }
        try{
            const response= AxiosApi.post('/notes', notesdata);
            console.log(notesdata)
        }
        catch (error) {
            console.error('Error creating post:', error);
        }
    }


    const HandleNotesTitleChange=(e)=>{
        setNotesTitle(e.target.value)
    }

    const NotesContentTitleChange=(e)=>{
        setNotesContent(e.target.value)
    }
    return (
        
            <div className="w-1/2 h-full bg-[#181818] px-12.5">
                {/* Title */}
                <div className="pt-12.5 pb-7.5 h-10 flex justify-between">
                    <div className="text-white font-semibold text-[32px]">
                        <input placeholder="Add your Notes title here" className="overflow-hidden text-white" onChange={HandleNotesTitleChange}/>
                    </div>
                    <div>
                        <img src={ThreeDots} alt="Three Dots" onClick={handleToggle} />
                    </div>
                </div>

                {/* On Clicking Add to Favorites Archive & delete */}
                <div className={`w-60 h-50 rounded-[6px] bg-[#333333] pl-4 top-20 right-20 flex-col justify-around absolute ${isVisible ? '' : 'hidden'}`} id="FAD">
                    <div className='flex pt-4 w-full'>
                        <img src={Favorite} className='pr-4 w-10 h-8' alt="Favorite" />
                        <p className='text-[#FFFFFF] text-[16px]'>Add to Favourites</p>
                    </div>
                    <div className='flex pt-5 pb-5 w-full items-center'>
                        <img src={Archive} className='pr-4 w-10 h-8' alt="Archive" />
                        <p className='text-[#FFFFFF] text-[16px]'>Archive</p>
                    </div>
                    <div className='w-[172px] border-t border-[#FFFFFF40] w-full'></div>
                    <div className='flex pt-4 items-center'>
                        <img src={Delete} className='pr-4 w-10 h-8' alt="Delete" />
                        <p className='text-[#FFFFFF] text-[16px]'>Delete</p>
                    </div>
                </div>

                {/* Date and Folder */}
                <div className="pt-8">
                    {/* Date Section */}
                    <div className="flex items-center pb-4">
                        <img src={Calendar} className="pr-3" alt="Calendar" />
                        <p className="text-[#FFFFFF60] pr-7">Date</p>
                    </div>

                    <div className="w-full border-t border-gray-300 my-4"></div>

                    {/* Folder Section */}
                    <div className="flex items-center pt-4">
                        <img src={Folder} className="pr-3" alt="Folder" />
                        <p className="text-[#FFFFFF60] pr-7">Folder</p>
                        {/* <input placeholder="Folder Name" /> */}
                    </div>
                </div>

                {/* Content Section */}
                <div className="pt-7.5 overflow-auto pb-27 w-full    ">
                    <textarea placeholder="Note Content" className=" w-full text-white items-start" rows={20}  onChange={NotesContentTitleChange}/>
                </div>
                <button className="bg-red-500 text-white rounded-2xl" onClick={SubmitBtnClick}>Submit</button>
            </div>
        
    );
}

export default AddNotes;
