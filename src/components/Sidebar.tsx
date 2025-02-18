import Nowted from "../logos/Nowted.svg";
import SearchIcon from "../logos/searchicon.svg";
import Document from "../logos/Document.svg";
import Folderlogo from "../logos/Folderlogo.svg";
import ClosedFolder from "../logos/ClosedFolder.svg";
import Favorites from "../logos/Favorites.svg";
import Archived from "../logos/Archived.svg";
import Trash from "../logos/Trash.svg";
import { useEffect, useState,createContext } from "react";
import axios from "axios";
import { NavLink, Link , useParams } from "react-router-dom";

function Sidebar() {

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("New_Folder");
  const [isediting, setIsEdited] = useState(false);
  const [dependencyRename,setDependencyRename] = useState("");
  const [recentdata, setRecentData] = useState([]);
  const [Folder, setFolder] = useState([]);
  const [error, setError] = useState(null);
  const [Errorfolder, setErrorfolder] = useState(null);
  const [FolderSelected,setFolderSelected]=useState(false);
  const [Visible, setVisible] = useState(false);
  const [NewnoteVisible, setNewnoteVisible] = useState(true);
  const {noteId,folderId}=useParams();
  // const  [RouteState,setRouteState]=useState(`/folders/${folderId}/note/newnote`);


  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });

  //   For Folders Api call
  useEffect(() => {
    // console.log("fetching folders");
    AxiosApi.get("/folders")
      .then((response) => {
        setFolder(response.data.folders);
      })
      .catch((Errorfolder) => {
        setErrorfolder(Errorfolder);
      });
  }, [dependencyRename]);

  // For Recents APi Call
  useEffect(() => {
    AxiosApi.get("/notes/recent")
      .then((response) => {
        setRecentData(response.data.recentNotes);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // newFolder = [new , ...Folder]

  

  

  const handleRename= async(id)=>{
      // console.log(id);
      setIsEdited(false)

      try{
        const response=await AxiosApi.patch(`/folders/${id}`,{
          name:newName
        });
        // console.log('Folder Renamed',response.data);
      }
      catch(error){
        console.error('Error creating post:', error);
      }
      setDependencyRename("folder");
  }

  // Search Functionality Visibility
  const handleClick = () => {
    setVisible(!Visible);
    setNewnoteVisible(!NewnoteVisible);
    
  };

  const AddFolder = async() => {
    try {
      const response = await AxiosApi.post('/folders', {
        name: "New Folder"
      });
      // console.log('Post created:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
    setFolderSelected(true)
    setDependencyRename("New folder");
  };

  const NewNoteClicked=()=>{
    if(FolderSelected===false && (folderId==='undefined' || folderId==='archive' || folderId==='trash' || folderId==='favorite')){
      alert('One of the folder needs to be Selected');
      setFolderSelected(false);
    }
    // console.log("Iwas Clicked")
  }

  //Renamimg folder doublclick
  const rename = (id: string, name: string) => {
    setEditingId(id);
    setIsEdited(true);
    setNewName(name);

    
      
    };
  
  return (
    // Main Div
    <div className="h-screen w-1/4  py-7.5 border-2  primary-bg flex flex-col gap-7.5">
      {/* Nowted & SearchIcon */}
      <div className="flex justify-between items-center px-5 ">
        {/* Nowted Logo */}
        <img src={Nowted} className="" alt="Nowted logo" />
        {/* Search Icon */}
        <button>
          <img
            src={SearchIcon}
            className="flex self-center cursor-pointer"
            alt="Search icon"
            onClick={handleClick}
          />
        </button>
      </div>

      {/* FirstHidden */}
      <div className={`flex px-5 h-10 ${Visible ? "" : "hidden"}`}>
        <img src={SearchIcon} className="pr-3" alt="Search" />
        <input placeholder="Search Note" className="text-white" />
      </div>

      {/* NewNote */}
      <div
        className={`px-5 flex justify-center items-center h-10 w-full ${
          NewnoteVisible ? "" : "hidden"
        }`}
      >
        {/* if(folderId) */}
        <Link to={`/folders/${folderId}/note/newnote`} className="flex justify-center items-center w-full" >
          <button className="cursor-pointer w-full new-note text-white text-center" onClick={NewNoteClicked}>
            + New Note
          </button>
        </Link>
      </div>


      {/* Recents Div */}
      <div className="h-39   ">
        <div className="pl-5 pb-2 text-[#FFFFFF] opacity-60 recent-font">
          Recents
        </div>
        <ul className="flex-col justify-evenly ">
          {recentdata &&
            recentdata &&
            recentdata.slice(0, 3).map((arr) => (
              <NavLink
                to={`/folders/${arr.folder.id}/note/${arr.id}`}
                key={arr.id}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center pl-5 h-10 bg-red-400"
                    : "flex items-center pl-5 h-10"
                }
              >
                <div className="flex pb-1.25 items-center">
                  <img
                    src={Document}
                    className="pr-4 opacity-60"
                    alt="Document"
                  />
                  <p className="h-5 overflow-hidden text-[#FFFFFF] opacity-60 font-semibold">
                    {arr.title}
                  </p>
                </div>
              </NavLink>
            ))}
        </ul>
      </div>

      {/* For   Folders */}
      <div className="h-[62] w-[75]    ">
        <div className="flex justify justify-between text-white h-5 pr-5 pl-5">
          <div className="pb-2.5 text-[#FFFFFF] opacity-60">Folders</div>
          <button className="cursor-pointer" onClick={AddFolder}>
            <img src={Folderlogo}></img>
          </button>
        </div>
        <ul className="overflow-y-auto max-h-[200px]">
          {Folder.map((folders, index) => (
            <li key={folders.id}>
              {isediting && editingId === folders.id ? (
                <div className="flex">
                <img src={ClosedFolder}></img>
                <input className="h-10 pl-5 w-full" type="text" value={newName} onChange={setNewName(e.target.value)}   onKeyDown={(e)=>e.key==="Enter" && handleRename(folders.id)} autoFocus/>
                </div>
              ) : (
                <NavLink
                  to={`/folders/${folders.id}`}
                  onDoubleClick={() => rename(folders.id, folders.name)}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center h-10 bg-blue-400 pl-5"
                      : "flex items-center h-10 pl-5"
                  }
                >
                  <img
                    src={ClosedFolder}
                    className="pr-3.75 text-white"
                    alt="Closed Folder"
                  />
                  <p className="text-[#FFFFFF] opacity-60">{folders.name}</p>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* More */}
      <div className="pl-5 ">
        <div className="font-600 text-[#FFFFFF] opacity-60">More</div>

        <NavLink to="/folders/favorite" className="flex w-75 h-10 self-center">
          <img src={Favorites} className="self-center pr-4.25"></img>
          <p className="self-center text-[#FFFFFF] opacity-60">Favorites</p>
        </NavLink>

        <NavLink to="/folders/trash" className="flex w-75 h-10">
          <img src={Trash} className="self-center pr-4.25"></img>
          <p className="self-center text-[#FFFFFF] opacity-60">Trash</p>
        </NavLink>

        <NavLink to="/folders/archive" className="flex w-75 h-10">
          <img src={Archived} className="self-center pr-4.25"></img>
          <p className="self-center text-[#FFFFFF] opacity-60">Archive</p>
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;
