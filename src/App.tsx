import Home from "./Pages/Home";
import NewNote from "./Pages/NewNote";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Trash from "./Pages/Trash";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={"folders/ddcb244b-2a79-4fed-b5b2-06c6ccb78c92"} />
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
    </BrowserRouter>
  );
}

export default App;
