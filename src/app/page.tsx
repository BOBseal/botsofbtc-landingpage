//import HomePage from "../screens/Home.jsx";
'use client'
import { NextPage } from "next"

import Navbar from "../components/navbar"
import BackgroundPaths from "../components/landingpage/background-paths"
import PartnerDetails from "../components/partners"
import Footer from "../components/footer"
import ProjectDetails from "../components/project-details"
import Roadmap from "../components/roadmap"

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <BackgroundPaths title="BOTS OF BITCOIN" />
      <ProjectDetails/>
      <PartnerDetails/>
      <Roadmap/>
      <Footer/>
    </div>
  )
}