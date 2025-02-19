import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import RestoreView from "../components/RestoreView";
import NotesList from "../components/NotesList";
function Trash() {
  const [restoreClicked, setRestoreClicked] = useState(false);
  const [favoritesChange, setFavoritesChange] = useState(false);
  const [archivedChange, setArchivedChange] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <NotesList
        favoritesChange={favoritesChange}
        setFavoritesChange={setFavoritesChange}
        archivedChange={archivedChange}
        setArchivedChange={setArchivedChange}
        deleteClicked={deleteClicked}
        setDeleteClicked={setDeleteClicked}
        restoreClicked={restoreClicked}
        setRestoreClicked={setRestoreClicked}
      />
      <RestoreView
        favoritesChange={favoritesChange}
        setFavoritesChange={setFavoritesChange}
        archivedChange={archivedChange}
        setArchivedChange={setArchivedChange}
        deleteClicked={deleteClicked}
        setDeleteClicked={setDeleteClicked}
        restoreClicked={restoreClicked}
        setRestoreClicked={setRestoreClicked}
      />
    </div>
  );
}

export default Trash;
