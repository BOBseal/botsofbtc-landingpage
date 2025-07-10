//import HomePage from "../screens/Home.jsx";
'use client'
import { NextPage } from "next"

import Navbar from "../components/navbar"
import BackgroundPaths from "../components/landingpage/background-paths"


export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <BackgroundPaths title="BOTS OF BITCOIN" />
    </div>
  )
}