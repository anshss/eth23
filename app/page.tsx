// Add "use client" directive
"use client"

import styled from "styled-components";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";

const StyledHome = styled.div`
  background-image: linear-gradient(to bottom, #a663de, #a333c8, #7346e5, #2962ff);
  color: white;
  display: flex;
  flex-direction: row;
  /* Set width to 100% */
  width: 100vw;
  align-items: flex-start
  /* Ensure child components fill the remaining space */
`;



export default function Home() {
  return (
    <div>
      <NavBar/>
      <StyledHome className="styledhome">
        <SideBar/>
        <Dashboard/>
    </StyledHome>
    </div>
    
  );
}
