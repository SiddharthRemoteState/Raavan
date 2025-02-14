import { useEffect, useState } from "react";
import axios from "axios";


// https://nowted-server.remotestate.com/notes?archived=false&favorite=false&deleted=false&folderId=1&page=1&limit=10
// https://nowted-server.remotestate.com/notes/recent

function CentreBar() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // API Call inside useEffect hook
    axios.get('api/notes', { 
      params:{
        archived:false,
        favorite:false,
        deleted:false,
        folderId:"",
        page:1,
        limit:10,

      }
    })
      .then(response => {
        setData(response.data); // Set response data to state
      })
      .catch(error => {
        setError(error); // Handle error and set to state
      });
  }, []);

  // Log data and error for debugging purposes
  console.log(data);
  console.log(error);

  return (
    <div className="w-1/4 bg-[#1C1C1C] h-full">
      <div className="w-full h-full pl-5 pr-5">
        {/* Personal name div */}
        {data && data.notes && data.notes.length > 0 && (
          <div className="pt-7.5 pr-12.5 pb-7.5 font-semibold text-white text-[22px]">
            {data.notes[0].folder.name} {/* Accessing name from the first note's folder */}
          </div>
        )}

        <div className="h-full overflow-y-auto">
          {data && data.notes && data.notes.map((arr, index) => (
            <div key={index} className="w-full h-24.5 bg-[#FFFFFF33] mb-4 p-5 flex-col">
              <div className="text-white flex">{arr.title}</div>
              <div className="flex w-full">
                <div className="text-400 text-[#FFFFFF60] pr-2.5">{arr.createdAt}</div>
                <div className="text-400 text-[#FFFFFF60]">{arr.preview}</div> {/* Showing preview instead of content */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CentreBar;
