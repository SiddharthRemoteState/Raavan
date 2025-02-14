import React from "react";
import Sidebar from "../components/Sidebar";
import CentreBar from "../components/CentreBar";
import RightBar from "../components/RightBar";
import { useParams } from "react-router-dom";

function Home() {
  return (
    <div className="flex h-screen">
        <Sidebar/>
        <CentreBar/>
        <RightBar/>

    </div>
  )
}

export default Home