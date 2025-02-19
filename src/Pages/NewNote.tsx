import React from "react";
import Sidebar from "../components/Sidebar";
import NotesList from "../components/NotesList";
import { useState } from "react";
import AddNotes from "../components/AddNotes";
function NewNote() {
  const [notesChange, setNotesChange] = useState(false);
  const [favoritesChange, setFavoritesChange] = useState(false);
  const [archivedChange, setArchivedChange] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [restore, setRestore] = useState(false);

  return (
    <div className="flex h-screen ">
      <Sidebar />
      <NotesList
        notesChange={notesChange}
        setNotesChange={setNotesChange}
        favoritesChange={favoritesChange}
        setFavoritesChange={setFavoritesChange}
        archivedChange={archivedChange}
        setArchivedChange={setArchivedChange}
        deleteClicked={deleteClicked}
        setDeleteClicked={setDeleteClicked}
        restore={restore}
        setRestore={setRestore}
      />
      <AddNotes notesChange={notesChange} setNotesChange={setNotesChange} />
    </div>
  );
}

export default NewNote;
