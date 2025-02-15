// import React from "react";
import Sidebar from "../components/Sidebar";
import CentreBar from "../components/CentreBar";
// import RightBar from "../components/RightBar";
// import { useParams } from "react-router-dom";
import AddNotes from "../components/AddNotes";
import RightBar from "../components/RightBar";

function Home() {
  return (
    <div className="flex h-screen w-full">
        <Sidebar />
        <CentreBar />
        <RightBar />
    </div>
  )
}

export default Home