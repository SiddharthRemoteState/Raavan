import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";



function CentreBar() {
  const {folderId}=useParams();
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const AxiosApi = axios.create({
    baseURL:'https://nowted-server.remotestate.com'
})

  const notesTitle=folderId === 'archive'?'archive':  folderId === 'favorite'? 'favorite' :  folderId === 'trash' ? 'trash' : folderId;
  
    useEffect(() => {

      const archived=folderId==='archive'? true:false;
      const favorite=folderId==='favorite'? true:undefined;
      const deleted=folderId==='trash'? true:false;
      const folderById = folderId === 'archive' || folderId === 'favorite' || folderId === 'trash' ? undefined : folderId;

      AxiosApi.get('/notes', {
        params: {
          archived,
          favorite,
          deleted,
          folderId:folderById,
          page: 1,
          limit: 10,
        }
      })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          setError(error);
        });
    }, [folderId]);
  
    // data.notes[0].folder.name

  return (
    <div className="w-1/4 bg-[#1C1C1C] h-full">
      <div className="w-full pl-5 pr-5">
        {/* Personal name div */}
        {data && data.notes && data.notes.length > 0 && (
          <div className="pt-7.5 pr-12.5 pb-7.5 font-semibold text-white text-[22px]">
            {(notesTitle === 'archive' || notesTitle === 'favorite' || notesTitle === 'trash') ? `${notesTitle} notes` : data.notes[0].folder.name}

          </div>
        )}

        <div className=" overflow-y-auto">
          {data && data.notes && data.notes.map((arr, index) => (
            <NavLink to={`/folders/${arr.folder.id}/note/${arr.id}`}  key={index} >
              <div className="w-full h-24.5 bg-[#FFFFFF33] mb-4 p-5 flex-col ">
              <div className="text-white flex">{arr.title}</div>
              <div className="flex w-full">
                <div className="text-400 text-[#FFFFFF60] pr-2.5">{arr.createdAt}</div>
                <div className="text-400 text-[#FFFFFF60] overflow-hidden">{arr.preview}</div> {/* Showing preview instead of content */}
              </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CentreBar;