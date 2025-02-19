import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

function NotesList({
  notesChange,
  setNotesChange,
  favoritesChange,
  setFavoritesChange,
  archivedChange,
  setArchivedChange,
  deleteClicked,
  setDeleteClicked,
  restore,
  setRestore,
}) {
  const { folderId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });

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
    const archived = folderId === "archive" ? true : false;
    const favorite = folderId === "favorite" ? true : undefined;
    const deleted = folderId === "trash" ? true : false;
    // if folderID is AFT it is UNdefined
    const folderById =
      folderId === "archive" || folderId === "favorite" || folderId === "trash"
        ? undefined
        : folderId;
    setIsLoading(true);
    AxiosApi.get("/notes", {
      params: {
        archived,
        favorite,
        deleted,
        folderId: folderById,
        page: 1,
        limit: 1000,
      },
    }).then((response) => {
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    });
  }, [
    folderId,
    notesChange,
    favoritesChange,
    archivedChange,
    deleteClicked,
    restore,
  ]);

  return (
    <div className="w-1/4 bg-[#1C1C1C] h-screen overflow-auto">
      {isLoading ? (
        <div className="text-white p-5">Loading ... </div>
      ) : (
        <div className="w-full pl-5 pr-5">
          {/* Personal name div */}
          {data && data.notes && data.notes.length === 0 ? (
            <div className="text-white p-5"> No Notes</div>
          ) : (
            data &&
            data.notes &&
            data.notes.length > 0 && (
              <div className="pt-7.5 pr-12.5 pb-7.5 font-semibold text-white text-[22px]">
                {notesTitle === "archive" ||
                notesTitle === "favorite" ||
                notesTitle === "trash"
                  ? `${notesTitle} notes`
                  : data.notes[0].folder.name}
              </div>
            )
          )}

          <div>
            {data &&
              data.notes &&
              data.notes.map((arr, index) => (
                <NavLink to={`/folders/${folderId}/note/${arr.id}`} key={index}>
                  <div className="w-full h-24.5 bg-[#FFFFFF33] mb-4 p-5 flex-col overflow-hidden">
                    <div className="text-white flex">{arr.title}</div>
                    <div className="flex w-full">
                      <div className="text-400 text-[#FFFFFF60] pr-2.5">
                        {arr.createdAt}
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
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="w-1/4 bg-[#1C1C1C] h-screen overflow-auto">
  //     {isLoading ? <div className="text-white p-5">Loading ... </div>: <div className="w-full pl-5 pr-5">
  //       {/* Personal name div */}
  //       {data.notes.length===0?("No Notes"):
  //       ({data && data.notes && data.notes.length > 0 && (
  //         <div className="pt-7.5 pr-12.5 pb-7.5 font-semibold text-white text-[22px]">
  //           {notesTitle === "archive" ||
  //           notesTitle === "favorite" ||
  //           notesTitle === "trash"
  //             ? `${notesTitle} notes`
  //             : data.notes[0].folder.name}
  //         </div>
  //       )})
  //     }
  //       <div>
  //         {data &&
  //           data.notes &&
  //           data.notes.map((arr, index) => (
  //             <NavLink to={`/folders/${folderId}/note/${arr.id}`} key={index}>
  //               <div className="w-full h-24.5 bg-[#FFFFFF33] mb-4 p-5 flex-col ">
  //                 <div className="text-white flex">{arr.title}</div>
  //                 <div className="flex w-full">
  //                   <div className="text-400 text-[#FFFFFF60] pr-2.5">
  //                     {arr.createdAt}
  //                   </div>
  //                   <div className="text-400 text-[#FFFFFF60] overflow-hidden">
  //                     {arr.preview}
  //                   </div>{" "}
  //                   {/* Showing preview instead of content */}
  //                 </div>
  //               </div>
  //             </NavLink>
  //           ))}
  //       </div>

  //       {/* <div className="flex justify-around">
  //         <div>
  //           <button className="bg-blue-600 text-white rounded-[6px">Prev</button>
  //         </div>
  //         <div>
  //           <button className="bg-blue-600 text-white rounded-[6px">Next</button>
  //         </div>
  //       </div> */}
  //     </div>}
  //   </div>
  // );
}

export default NotesList;
