import ThreeDots from "../logos/ThreeDot.svg";
import Calendar from "../logos/Calendar.svg";
import Folder from "../logos/Folderlogo.svg";
import Favorite from "../logos/Favorites.svg";
import Archive from "../logos/Archived.svg";
import Delete from "../logos/Trash.svg";
import axios from "axios";
import  useDebounce  from "../Hooks/Deboune";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ClosedNoteView from "./ClosedNoteView";
import RestoreView from "./RestoreView";
import { useNavigate } from "react-router-dom";
import dateconversion from "../Helper/dateconversion ";

function RightBar({
  favoritesChange,
  setFavoritesChange,
  archivedChange,
  setArchivedChange,
  deleteClicked,
  setDeleteClicked,
  restoreClicked,
  setRestoreClicked,
}: {
  favoritesChange: boolean;
  setFavoritesChange: React.Dispatch<React.SetStateAction<boolean>>;
  archivedChange: boolean;
  setArchivedChange: React.Dispatch<React.SetStateAction<boolean>>;
  deleteClicked: boolean;
  setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
  restoreClicked: boolean;
  setRestoreClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    content: string;
    isFavorite: boolean;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    folder: Folder;
  }

  interface Data {
    note: Note;
  }

  const navigate = useNavigate();
  const { noteId, folderId } = useParams();
  const [data, setData] = useState<Data | null>(null);
  //for loading
  const [isLoading, setIsLoading] = useState(false);
  // For Favorite state
  const [isFavorite, setIsFavorite] = useState(true);
  // For ARchive state
  const [isArchived, setIsArchived] = useState(true);
  // for toggling the archive favorite & delete button
  const [isVisible, setIsVisble] = useState(false);
  const [titleOfNotes, setTitleOfNotes] = useState(data?.note?.title || "");
  const [isNoteEdited,setIsNoteEdited]=useState(true);
  const [contentOfNotes, setContentOfNotes] = useState(
    data?.note?.content || ""
  );

  // const debouncedValue = useDebounce({titleOfNotes,contentOfNotes}, 2000);
  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });

  const debouncedNotesTitle = useDebounce( useCallback((updateTitle:string,updateContent:string) => {
    if (noteId!==undefined) {
      AxiosApi.patch(`/notes/${noteId}`, {
        title: updateTitle,  
        content:updateContent,
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      });
    }
  }, []) ,500);

  // useEffect(()=>{
  //   debouncedNotesTitle();
  // },[debouncedNotesTitle]);

  // useEffect(() => {
  //   const updateNote = async () => {
  //     try {
  //       await AxiosApi.patch(`/notes/${noteId}`, {
  //         content: contentOfNotes,
  //       });
  //     } catch (error) {
  //       console.error("Error updating note:", error);
  //     }
  //   };
  
  //   updateNote();
  // }, [noteId, contentOfNotes, titleOfNotes]);
  


  // Should Change whenever noteId Changes
  useEffect(() => {
    console.log(noteId);
    setIsLoading(false);
    if (noteId) {
      AxiosApi.get(`/notes/${noteId}`).then((response) => {
        setData(response.data);
        setTitleOfNotes(response.data.note.title);
        setContentOfNotes(response.data.note.content);
        setIsFavorite(response.data.note.isFavorite);
        setIsArchived(response.data.note.isArchived);
        setIsLoading(false);
      });
    }
  }, [noteId]);

  // For toggling Visibility
  const handleToggle = () => {
    setIsVisble(!isVisible);
  };

  const HandleAddToFavorite = async () => {
    const newFavoriteState = !isFavorite;

    try {
      await AxiosApi.patch(`notes/${noteId}`, {
        isFavorite: newFavoriteState,
      });
      setFavoritesChange(!favoritesChange);
      setIsFavorite(newFavoriteState);
      console.log(isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleAddToArchive = async () => {
    const changeArchiveState = !isArchived;
    await AxiosApi.patch(`/notes/${noteId}`, {
      isArchived: changeArchiveState,
    });
    try {
      setIsArchived(!isArchived);
      const response = await AxiosApi.get(`/notes/${noteId}`);
      setData(response.data);
      setArchivedChange(!archivedChange);
      navigate(`/folders/${folderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDelete = async () => {
    try {
      await AxiosApi.delete(`/notes/${noteId}`);
      navigate(`/folders/${folderId}`);
      setDeleteClicked(!deleteClicked);
      console.log("Deleted ");
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const HandleNotesTitleChanged = (e) => {
    // setIsNoteEdited(true);
    debouncedNotesTitle(e.target.value,contentOfNotes);
    setTitleOfNotes(e.target.value);
  };

  const HandleNotesContentChange = (e) => {
    // setIsNoteEdited(true);
    debouncedNotesTitle(titleOfNotes,e.target.value);
    setContentOfNotes(e.target.value);
  };
  if (noteId === undefined) return <ClosedNoteView />;
  if (folderId == "trash")
    return (
      <RestoreView
        restoreClicked={restoreClicked}
        setRestoreClicked={setRestoreClicked}
      />
    );

  return (
    <>
      {isLoading ? (
        <div className="text-white p-5">Loading ... </div>
      ) : (
        <div className="w-1/2 bg-[#181818] px-12.5">
          {/* Title */}
          <div className="pt-12.5 pb-7.5 h-10 flex justify-between items-center">
            <div className="text-white font-semibold text-[32px] value={}">
              <input
                value={titleOfNotes}
                className="text-white"
                onChange={HandleNotesTitleChanged}
              ></input>
            </div>
            <div>
              <img
                src={ThreeDots}
                alt="Three Dots"
                onClick={handleToggle}
                className="items-center"
              />
            </div>
          </div>

          {/* On Clicking make them visible & block them Add to Favorites Archive & delete */}
          <div
            className={`w-60 h-50 rounded-[6px] bg-[#333333] pl-4 pr-4 top-20 right-20 flex flex-col justify-around  absolute ${
              isVisible ? "" : "hidden"
            }`}
            id="FAD"
          >
            <div
              className="flex  w-full hover:bg-blue-500 items-center h-10 rounded-xl"
              onClick={HandleAddToFavorite}
            >
              <img src={Favorite} className="pr-4" />
              <p className="text-[#FFFFFF] text-[16px]">
                {isFavorite === undefined
                  ? "Add to Favorite"
                  : isFavorite
                  ? "Remove From Favorites"
                  : "Add to Favorite"}
              </p>
            </div>
            <div
              className="flex  w-full hover:bg-blue-500 items-center h-10 rounded-xl"
              onClick={HandleAddToArchive}
            >
              <img src={Archive} className="pr-4 " />
              <p className="text-[#FFFFFF] text-[16px]">
                {`${
                  data && data.note && data.note.isArchived === undefined
                    ? "Archive"
                    : data && data.note && data.note.isArchived
                    ? "Unarchive"
                    : "Archive"
                }`}
              </p>
            </div>

            <div
              className="flex items-center hover:bg-blue-500 h-10 rounded-xl"
              onClick={HandleDelete}
            >
              <img src={Delete} className="pr-4 " />
              <p className="text-[#FFFFFF] text-[16px]">Delete</p>
            </div>
          </div>

          {/* Date and Folder */}
          <div className="pt-8">
            {/* Date Section */}
            <div className="flex items-center pb-4">
              <img src={Calendar} className="pr-3" alt="Calendar" />
              <p className="text-[#FFFFFF60] pr-7">Date</p>
              <p className="text-white font-semibold text-4 underline">
                {data && data.note ? dateconversion(data.note.createdAt) : ""}
              </p>
            </div>

            <div className="w-full border-t border-gray-300 my-4"></div>

            {/* Folder Section */}
            <div className="flex items-center pt-4">
              <img src={Folder} className="pr-3" alt="Folder" />
              <p className="text-[#FFFFFF60] pr-7">Folder</p>
              <p className="text-white font-semibold text-4 underline">
                {data && data.note ? data.note.folder.name : ""}
              </p>
            </div>
            <textarea
              rows={50}
              className="overflow-y-auto h-170 text-white mt-10 w-240 "
              value={contentOfNotes}
              onChange={HandleNotesContentChange}
            ></textarea>
          </div>
        </div>
      )}
    </>
  );
}

export default RightBar;
