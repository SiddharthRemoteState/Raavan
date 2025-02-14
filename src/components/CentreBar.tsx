import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";



function CentreBar() {
  const {folderId}=useParams();
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);



  
    useEffect(() => {

      axios.get('/api/notes', {
        params: {
          archived: false,
          favorite: false,
          deleted: false,
          folderId,
          page: 1,
          limit: 10,
        },
        headers: {
          'Cache-Control': 'no-cache',  // Disable caching
          'Pragma': 'no-cache',         // Disable caching
          'Expires': '0',               // Disable caching
        },
      })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          setError(error);
        });
    }, [folderId]);
  
    

  return (
    <div className="w-1/4 bg-[#1C1C1C] h-full">
      <div className="w-full h-full pl-5 pr-5">
        {/* Personal name div */}
        {data && data.notes && data.notes.length > 0 && (
          <div className="pt-7.5 pr-12.5 pb-7.5 font-semibold text-white text-[22px]">
            {data.notes[0].folder.name===null?"No Notes" : data.notes[0].folder.name} 
          </div>
        )}

        <div className="h-full overflow-y-auto">
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