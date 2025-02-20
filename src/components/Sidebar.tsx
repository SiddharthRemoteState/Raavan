import Nowted from "../logos/Nowted.svg";
import SearchIcon from "../logos/searchicon.svg";
import Document from "../logos/Document.svg";
import Folderlogo from "../logos/Folderlogo.svg";
import ClosedFolder from "../logos/ClosedFolder.svg";
import Favorites from "../logos/Favorites.svg";
import Archived from "../logos/Archived.svg";
import Trash from "../logos/Trash.svg";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useDebounce } from "../Hooks/Deboune";

function Sidebar() {
  interface Folder {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }
  interface Note {
    id: string;
    folderId: string;
    title: string;
    isFavorite: boolean;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    preview: string;
    folder: Folder;
  }

  const navigate = useNavigate();
  // this is for when you are finished editing your folder name
  const [isediting, setIsEdited] = useState(false);
  // whenever we rename a folder it changes & then folders are rendered again
  const [dependencyRename, setDependencyRename] = useState("");
  // recentnotes are stored in recentdata
  const [recentdata, setRecentData] = useState<Note[]>([]);
  // folders are stored in Foldr
  const [Folder, setFolder] = useState<Folder[]>([]);
  const [error, setError] = useState(null);
  const [Errorfolder, setErrorfolder] = useState(null);
  // used to ensure at least one folder is Selected when adding new note
  const [FolderSelected, setFolderSelected] = useState(false);
  // On clicking Search Icon an input appears to track that
  const [Visible, setVisible] = useState(false);
  // to track will there be an input for Search or Adding New Note Feature
  const [NewnoteVisible, setNewnoteVisible] = useState(true);
  const [isLoadingRecents, setIsLoadingRecents] = useState(false);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  // for storing new folder name by default it is New Folder
  const [newName, setNewName] = useState<string | null>("New_Folder");
  const [isFolderDeleted, setIsFolderDeleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResult, setSearchQueryResult] = useState([]);

  const [isLoadingSearchResult, setIsLoadingSearchResult] = useState(false);
  const debouncedValue = useDebounce(searchQuery, 200);

  const searchNotes = useCallback(() => {
    if (!debouncedValue) {
      setSearchQueryResult([]);
      return;
    }
    AxiosApi.get(`/notes`, {
      params: {
        deleted: "false",
        page: 1,
        limit: 10,
        search: debouncedValue,
      },
    }).then((res) => {
      setSearchQueryResult(res.data.notes);
    });
  }, [debouncedValue]);


  useEffect(()=>{
    searchNotes();
  },
  [searchNotes])



  const { folderId, noteId } = useParams();

  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });

  //Fetching Folders in Side Bar
  // rerenders When U change folder name
  useEffect(() => {
    setIsLoadingFolders(true);
    AxiosApi.get("/folders")
      .then((response) => {
        setFolder(response.data.folders);
        setIsLoadingFolders(false);
      })
      .catch((Errorfolder) => {
        setErrorfolder(Errorfolder);
      });
  }, [dependencyRename, isFolderDeleted]);

  // Fetching Recents
  // Will run only once
  useEffect(() => {
    setIsLoadingRecents(true);
    AxiosApi.get("/notes/recent")
      .then((response) => {
        setIsLoadingRecents(false);
        setRecentData(response.data.recentNotes);
      })
      .catch((error) => {
        setError(error);
      });
  }, [noteId]);

  const handleRename = async (id: string) => {
    //You are Finished Editing your Foldername
    setIsEdited(false);

    try {
      const response = await AxiosApi.patch(`/folders/${id}`, {
        name: newName,
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
    // Changed Folder name so they should be re-rendered
    setDependencyRename("folder");
  };

  // Search Functionality Visibility
  const handleClick = () => {
    setVisible(!Visible);
    setNewnoteVisible(!NewnoteVisible);
  };

  const AddFolder = async () => {
    try {
      const response = await AxiosApi.post("/folders", {
        name: "New Folder",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setFolderSelected(true);
    setDependencyRename("New folder");
    toast.success("Folder Added", {
      position: "top-left",
      autoClose: 1000,
    });
  };

  // const NewNoteClicked = () => {
  //   // At least one folder needs to be selected & checking FolderSelected so that this doesnot appear on first reload
  //   if (
  //     FolderSelected === false &&
  //     (folderId === "undefined" ||
  //       folderId === "archive" ||
  //       folderId === "trash" ||
  //       folderId === "favorite")
  //   ) {
  //     alert("One of the folder needs to be Selected");
  //     setFolderSelected(false);
  //   }
  //   // console.log("Iwas Clicked")
  // };

  //Renamimg folder on doublclick
  const rename = (id: string, name: string) => {
    // to track which folder has been double clicked
    setEditingId(id);
    //you are finished editing your Folder name
    setIsEdited(true);
    //For Storing New Folder Name
    setNewName(name);
  };
  //For deleting Folder
  const DeleteFolderClicked = async () => {
    try {
      await AxiosApi.delete(`folders/${folderId}`);
      setIsFolderDeleted(!isFolderDeleted);
      toast.warning("Folder Deleted Successfully", {
        position: "top-left",
        autoClose: 1000,
      });
    } catch (error) {
      console.log("Error Countered");
    }
    console.log("DeleteButton Clicked");
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const firstFolderId = Folder[0]?.id;

  return folderId === undefined ? (
    firstFolderId && navigate(`/folders/${firstFolderId}`)
  ) : (
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

      {/* FirstHidden first hidden on Clicking Search Icon this will be Visible*/}
      <div
        className={`flex   ${Visible ? "" : "hidden"} relative items-center `}
      >
        <img
          src={SearchIcon}
          className="absolute top-[-10] items-center flex px-5"
          alt="Search"
        />
        <input
          placeholder="Search Anything"
          className="text-white w-full pl-10 px-5"
          onChange={handleSearchChange}
          value={searchQuery}
        />
        <ul className="max-h-40 gap-5 overflow-y-auto flex flex-col bg-[#181818] w-full absolute top-8 px-5 z-20">
          {isLoadingSearchResult ? (
            <li className="text-white">Loading...</li> // Simple message for loading
          ) : (
            searchQueryResult.map((note) => (
              <NavLink
                to={`/folders/${note.folder.id}/note/${note.id}`}
                key={note.id}
                className="text-white bg-gray-600 flex items-center justify-center hover:bg-gray-800"
              >
                {note.title}
              </NavLink>
            ))
          )}
        </ul>
      </div>

      {/* NewNote  first visible on Clicking Search Icon this will be Hidden*/}
      <div
        className={`px-5 flex justify-center items-center h-10 w-full ${
          NewnoteVisible ? "" : "hidden"
        }`}
      >
        {/*  */}
        <Link
          to={`/folders/${folderId}/note/newnote`}
          className="flex justify-center items-center w-full"
        >
          <button
            className="cursor-pointer w-full p-4 new-note text-white text-center"
            // onClick={NewNoteClicked}
          >
            + New Note
          </button>
        </Link>
      </div>

      {/* Recents Notes */}
      <div className="h-39   ">
        <div className="pl-5 pb-2 text-[#FFFFFF] opacity-60 recent-font z-20">
          Recents
        </div>
        {isLoadingRecents ? (
          <div className="text-white p-5">Loading...</div>
        ) : (
          <ul className="flex-col justify-evenly ">
            {recentdata &&
              recentdata &&
              recentdata.slice(0, 3).map((arr) => (
                // On click on any Particular Note  Redirect it to the given route
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
        )}
      </div>

      {/* For   Folders */}
      <div className="h-[62] w-[75]">
        <div className="flex justify justify-between text-white h-5 pr-5 pl-5">
          <div className="pb-2.5 text-[#FFFFFF] opacity-60">Folders</div>
          <button className="cursor-pointer" onClick={AddFolder}>
            <img src={Folderlogo}></img>
          </button>
        </div>
        {isLoadingFolders ? (
          <div className="text-white p-5">Loading...</div>
        ) : (
          <ul className="overflow-y-auto max-h-[200px]">
            {Folder.map((folders) => (
              <li key={folders.id}>
                {/* If Editing ID is equal to folders.id then a input box will appear inside */}
                {isediting && editingId === folders.id ? (
                  <div className="flex">
                    <img src={ClosedFolder}></img>
                    {/* autofocus is used for focusig input when clicked && SpellCheck is because there were squigly red lines under */}
                    <input
                      className="h-10 pl-5 w-full focus:bg-gray-400"
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleRename(folders.id)
                      }
                      autoFocus
                      spellCheck="false"
                    />
                  </div>
                ) : (
                  <div className="flex justify-between pr-8">
                    <NavLink
                      to={`/folders/${folders.id}`}
                      onDoubleClick={() => rename(folders.id, folders.name)}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center h-10 bg-blue-400 pl-5 w-full justify-between"
                          : "flex items-center h-10 pl-5 w-full justify-between"
                      }
                    >
                      <div className="flex">
                        <img
                          src={ClosedFolder}
                          className="pr-3.75 text-white"
                          alt="Closed Folder"
                        />
                        <p className="text-[#FFFFFF] opacity-60">
                          {folders.name}
                        </p>
                      </div>
                      <img
                        src={Trash}
                        className="pl-10 cursor-pointer"
                        onClick={DeleteFolderClicked}
                      ></img>
                    </NavLink>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
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

//
