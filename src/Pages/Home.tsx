// import React from "react";
import Sidebar from "../components/Sidebar";
import NotesList from "../components/NotesList";
// import RightBar from "../components/RightBar";
// import { useParams } from "react-router-dom";
// import AddNotes from "../components/AddNotes";
import RightBar from "../components/RightBar";
import { useState } from "react";


function Home() {

  const [favoritesChange,setFavoritesChange]=useState(false);
  const [archivedChange,setArchivedChange]=useState(false);
  const [deleteClicked,setDeleteClicked]=useState(false);
  const [restore,setRestore]=useState(false);

  
  return (
    <div className="flex h-screen  w-full">
        <Sidebar />
        <NotesList  favoritesChange={favoritesChange} setFavoritesChange={setFavoritesChange} archivedChange={archivedChange} setArchivedChange={setArchivedChange} deleteClicked={deleteClicked} setDeleteClicked={setDeleteClicked} restore={restore} setRestore={setRestore}/>
        <RightBar favoritesChange={favoritesChange} setFavoritesChange={setFavoritesChange} archivedChange={archivedChange} setArchivedChange={setArchivedChange} deleteClicked={deleteClicked} setDeleteClicked={setDeleteClicked} restore={restore} setRestore={setRestore}/>
    </div>
  )
}

export default Home