import Home from "./Pages/Home";
import NewNote from "./Pages/NewNote";
import {  Route, Routes } from "react-router-dom";
import Trash from "./Pages/Trash";

function App() {
  return (
    
      <Routes>
        <Route
          path="/"
          element={
            <Home/>
          }
        />
        <Route path="/folders/:folderId" element={<Home />} />
        <Route path="/folders/:folderId/note/:noteId" element={<Home />} />
        <Route path="/trash" element={<Trash />} />

        <Route path="/folders/:favoritenotes" element={<Home />} />
        <Route path="/folders/:favoritenotes/note/:noteId" element={<Home />} />

        <Route path="/folders/:archivenotes" element={<Home />} />
        <Route path="/folders/:archivenotes/note/:noteId" element={<Home />} />

        <Route path="/folders/:trashnotes" element={<Home />} />
        <Route path="/folders/:trashnotes/note/:noteId" element={<Home />} />

        <Route path="/folders/:folderId/note/newnote" element={<NewNote />} />
      </Routes>
  );
}

export default App;
