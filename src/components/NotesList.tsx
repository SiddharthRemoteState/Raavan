import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import dateconversion from "../Helper/dateconversion ";

function NotesList({
  notesChange,
  setNotesChange,
  favoritesChange,
  setFavoritesChange,
  archivedChange,
  setArchivedChange,
  deleteClicked,
  setDeleteClicked,
  restoreClicked,
  setRestoreClicked,
}) {
  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });
  const { folderId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [hasMoreNotes, setHasMoreNotes] = useState(true);

  const notesTitle =
    folderId === "archive"
      ? "archive"
      : folderId === "favorite"
      ? "favorite"
      : folderId === "trash"
      ? "trash"
      : folderId;

  /////For Notes
  useEffect(() => {
    const fetchNotes = async () => {
      const archived = folderId === "archive" ? true : false;
      const favorite = folderId === "favorite" ? true : undefined;
      const deleted = folderId === "trash" ? true : false;
      const folderById =
        folderId === "archive" ||
        folderId === "favorite" ||
        folderId === "trash"
          ? undefined
          : folderId;
      // console.log(folderById)
      console.log(currPage)
      setIsLoading(true);

      try {
        const response = await AxiosApi.get("/notes", {
          params: {
            archived,
            favorite,
            deleted,
            folderId: folderById,
            page: currPage,
            limit: 5,
          },
        });
        
        if(currPage === 1)setData(response.data.notes)
        else setData((prevData)=>[...prevData ,  ...response.data.notes])

        if (response.data.notes.length < 5) {
          setHasMoreNotes(false);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [
    currPage,
    folderId,
    notesChange,
    favoritesChange,
    archivedChange,
    deleteClicked,
    restoreClicked,
  ]);

  const handleLoadMore = () => {
    console.log(hasMoreNotes);
    if (hasMoreNotes) {
      setCurrPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="w-1/4 bg-[#1C1C1C] h-screen overflow-auto">
      {isLoading ? (
        <div className="text-white p-5">Loading ... </div>
      ) : (
        <div className="w-full pl-5 pr-5">
          {/* Personal name div */}
          {data && data.length === 0 ? (
            <div className="text-white p-5 "> No Notes</div>
          ) : (
            data &&
            data.length > 0 && (
              <div className="pt-7.5 pr-12.5 pb-7.5 font-semibold text-white text-[22px]">
                {notesTitle === "archive" ||
                notesTitle === "favorite" ||
                notesTitle === "trash"
                  ? `${notesTitle} notes`
                  : data[0].folder.name}
              </div>
            )
          )}

          <div>
            {data &&
              data  .map((arr, index) => (
                <NavLink to={`/folders/${folderId}/note/${arr.id}`} key={index}>
                  <div className="w-full h-24.5 bg-[#FFFFFF33] mb-4 p-5 flex-col overflow-hidden">
                    <div className="text-white flex ">
                      {arr.title.substring(0, 20)}
                    </div>
                    <div className="flex w-full">
                      <div className="text-400 text-[#FFFFFF60] pr-2.5">
                        {dateconversion(arr.createdAt)}
                      </div>
                      <div className="text-400 text-[#FFFFFF60] overflow-hidden">
                        {arr.preview}
                      </div>
                      {/* Showing preview instead of content */}
                    </div>
                  </div>
                </NavLink>
              ))}
          </div>

          {
            <div
              className="text-white flex justify-center items-center cursor-pointer hover:bg-gray-800 mb-3"
              onClick={handleLoadMore}
            >
              Load More
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default NotesList;
