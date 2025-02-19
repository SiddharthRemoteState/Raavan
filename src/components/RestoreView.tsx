import Restore from "../logos/Restore.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RestoreView({ restoreClicked, setRestoreClicked }) {
  const [data, setData] = useState([]);
  const { folderId } = useParams();
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });

  //For Restoring Post
  const RestoreButton = () => {
    const noteData = {
      folderId,
      title: data.title,
      content: data.content,
      isFavorite: false,
      isArchived: false,
    };

    AxiosApi.post(`/notes/${noteId}/restore`, noteData).then((res) => {
      navigate(`/folders/trash`);
      //Not Working
      setRestoreClicked(!restoreClicked);
    });
  };

  //getting notes
  useEffect(() => {
    setIsLoading(true);
    AxiosApi.get(`/notes/${noteId}`).then((response) => {
      setData(response.data.note);
      setIsLoading(false);
    });
  }, [noteId]);

  return (
    <div className="w-1/2 bg-[#181818] px-12.5 flex justify-center items-center">
      {isLoading ? (
        <div className="text-white flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img src={Restore} alt="Big Document" className="" />
          <h1 className="flex text-[28px] text-[#FFFFFF] font-semibold justify-center items-center pb-2.5">
            {`Restore ${data.title}`}
          </h1>
          <p className="font-400 text-[#FFFFFF60] text-[16px]">
            Do you want to lose this note? It's not too late ! Just Click the
            Restore
          </p>
          <p className="font-400 text-[#FFFFFF60]">
            button it will be added back to your list . It's that Simple
          </p>
          <button
            className="bg-[#312EB5] w-28 h-10.5 mt-2.5 cursor-pointer text-[#FFFFFF] font-400 rounded-[6px] text-[16px]"
            onClick={RestoreButton}
          >
            Restore
          </button>
        </div>
      )}
    </div>
  );
}
export default RestoreView;
